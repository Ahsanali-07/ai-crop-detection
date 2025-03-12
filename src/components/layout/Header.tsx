
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LogIn, LayoutDashboard, BookOpen, MessageSquare, LineChart, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [supportsVoice, setSupportsVoice] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupportsVoice(false);
    }
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled 
          ? "py-2 card-glass border-b border-white/10 shadow-sm bg-background/80 backdrop-blur-md" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-90 focus-visible:opacity-90"
        >
          <Leaf className="w-6 h-6 text-plant-500" strokeWidth={2.5} />
          <span className="text-xl font-semibold tracking-tight text-foreground">PlantCare</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/dashboard">
            <LayoutDashboard className="w-4 h-4 mr-1" />
            Dashboard
          </NavLink>
          <NavLink to="/insights">
            <BarChart3 className="w-4 h-4 mr-1" />
            Insights
          </NavLink>
          <NavLink to="/knowledge">
            <BookOpen className="w-4 h-4 mr-1" />
            Knowledge
          </NavLink>
          <a href="#assistant" className="font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            Assistant
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/auth/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
          <Button size="sm" className="bg-plant-500 hover:bg-plant-600 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

type NavLinkProps = {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
};

function NavLink({ to, exact, children }: NavLinkProps) {
  const location = useLocation();
  const path = location.pathname;
  const isActive = exact ? path === to : path.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={cn(
        "font-medium transition-colors relative flex items-center",
        isActive 
          ? "text-foreground after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-plant-500 after:rounded-full" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
