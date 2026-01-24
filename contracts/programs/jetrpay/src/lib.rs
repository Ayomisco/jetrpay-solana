use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod jetrpay {
    use super::*;

    pub fn initialize_stream(
        ctx: Context<InitializeStream>,
        amount: u64,
        start_time: i64,
        end_time: i64,
    ) -> Result<()> {
        let stream = &mut ctx.accounts.stream;
        stream.sender = ctx.accounts.sender.key();
        stream.recipient = ctx.accounts.recipient.key();
        stream.mint = ctx.accounts.mint.key();
        stream.start_time = start_time;
        stream.end_time = end_time;
        stream.total_amount = amount;
        stream.withdrawn_amount = 0;
        stream.bump = ctx.bumps.stream;

        // Transfer funds to vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.sender_token.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.sender.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        msg!("Stream initialized: {} tokens from {} to {}", amount, stream.sender, stream.recipient);
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let stream = &mut ctx.accounts.stream;
        let clock = Clock::get()?;
        let current_time = clock.unix_timestamp;

        // Calculate vested amount
        let time_elapsed = current_time.checked_sub(stream.start_time).unwrap_or(0);
        let duration = stream.end_time.checked_sub(stream.start_time).unwrap();
        
        let vested_amount = if current_time >= stream.end_time {
            stream.total_amount
        } else {
            (stream.total_amount as u128)
                .checked_mul(time_elapsed as u128)
                .unwrap()
                .checked_div(duration as u128)
                .unwrap() as u64
        };

        let withdrawable = vested_amount.checked_sub(stream.withdrawn_amount).unwrap();
        require!(withdrawable > 0, StreamError::NoFundsAvailable);

        // Transfer from vault to recipient
        let stream_key = stream.key();
        let seeds = &[
            b"stream",
            stream.sender.as_ref(),
            stream.recipient.as_ref(),
            &[stream.bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.recipient_token.to_account_info(),
            authority: stream.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer
        );
        token::transfer(cpi_ctx, withdrawable)?;

        stream.withdrawn_amount += withdrawable;
        
        msg!("Withdrawn: {}", withdrawable);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeStream<'info> {
    #[account(init, payer = sender, space = 8 + 32 + 32 + 32 + 8 + 8 + 8 + 8 + 1, seeds = [b"stream", sender.key().as_ref(), recipient.key().as_ref()], bump)]
    pub stream: Account<'info, Stream>,
    #[account(mut)]
    pub sender: Signer<'info>,
    /// CHECK: Recipient wallet
    pub recipient: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    #[account(mut)]
    pub sender_token: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = sender,
        token::mint = mint,
        token::authority = stream,
        seeds = [b"vault", stream.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, has_one = recipient, has_one = sender)]
    pub stream: Account<'info, Stream>,
    #[account(mut)]
    pub recipient: Signer<'info>,
    /// CHECK: Sender address for seed verification
    pub sender: AccountInfo<'info>,
    #[account(mut, seeds = [b"vault", stream.key().as_ref()], bump)]
    pub vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub recipient_token: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Stream {
    pub sender: Pubkey,
    pub recipient: Pubkey,
    pub mint: Pubkey,
    pub start_time: i64,
    pub end_time: i64,
    pub total_amount: u64,
    pub withdrawn_amount: u64,
    pub bump: u8,
}

#[error_code]
pub enum StreamError {
    #[msg("No funds available for withdrawal at this time.")]
    NoFundsAvailable,
}
