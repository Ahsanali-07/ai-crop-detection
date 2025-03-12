
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, BookOpen, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled 
          ? "py-2 card-glass border-b border-white/10 shadow-sm" 
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
          <NavLink to="/knowledge">Knowledge</NavLink>
          <a href="#assistant" className="font-medium text-muted-foreground hover:text-foreground transition-colors">Assistant</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Login
          </Button>
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
  const path = window.location.pathname;
  const isActive = exact ? path === to : path.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={cn(
        "font-medium transition-colors relative",
        isActive 
          ? "text-foreground after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-plant-500 after:rounded-full" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
