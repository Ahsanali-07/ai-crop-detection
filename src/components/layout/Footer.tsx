
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-accent/40 py-12 mt-16">
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-plant-500" strokeWidth={2.5} />
            <span className="text-xl font-semibold tracking-tight">PlantCare</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            AI-powered plant disease detection and management system designed with care for farmers and plant enthusiasts.
          </p>
          <div className="flex gap-4">
            <SocialLink icon={<Github className="w-4 h-4" />} href="#" label="GitHub" />
            <SocialLink icon={<Twitter className="w-4 h-4" />} href="#" label="Twitter" />
            <SocialLink icon={<Mail className="w-4 h-4" />} href="#" label="Email" />
          </div>
        </div>
        
        <FooterLinks
          title="Product"
          links={[
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "API", href: "#" },
            { label: "Integrations", href: "#" },
          ]}
        />
        
        <FooterLinks
          title="Resources"
          links={[
            { label: "Knowledge Base", href: "/knowledge" },
            { label: "Community Forum", href: "#" },
            { label: "Plant Disease Index", href: "#" },
            { label: "Treatment Guide", href: "#" },
          ]}
        />
        
        <FooterLinks
          title="Company"
          links={[
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "#" },
          ]}
        />
      </div>
      
      <div className="container mt-12 border-t border-border pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PlantCare. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type SocialLinkProps = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

function SocialLink({ icon, href, label }: SocialLinkProps) {
  return (
    <a 
      href={href}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-background border border-border hover:bg-accent transition-colors"
    >
      {icon}
    </a>
  );
}

type FooterLinksProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link 
              to={link.href} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
