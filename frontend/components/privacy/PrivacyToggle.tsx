'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function PrivacyToggle() {
  const [isGhostMode, setIsGhostMode] = useState(false);

  useEffect(() => {
    // Check local storage or default to false
    const stored = localStorage.getItem('jetrpay_ghost_mode');
    if (stored === 'true') {
      setIsGhostMode(true);
      document.documentElement.classList.add('ghost-mode');
    }
  }, []);

  const toggleGhostMode = () => {
    const newState = !isGhostMode;
    setIsGhostMode(newState);
    localStorage.setItem('jetrpay_ghost_mode', String(newState));
    
    if (newState) {
      document.documentElement.classList.add('ghost-mode');
      toast({
        title: "Ghost Mode Activated",
        description: "All sensitive data is now hidden",
      });
    } else {
      document.documentElement.classList.remove('ghost-mode');
      toast({
        title: "Ghost Mode Deactivated",
        description: "Sensitive data is now visible",
      });
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleGhostMode}
      className={isGhostMode ? "text-green-500 animate-pulse" : "text-muted-foreground"}
      title={isGhostMode ? "Ghost Mode Active" : "Enable Ghost Mode"}
    >
      {isGhostMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </Button>
  );
}
