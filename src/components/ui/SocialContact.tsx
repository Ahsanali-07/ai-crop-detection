
import React from 'react';
import { Mail, Linkedin, Github, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SocialContact = () => {
  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:ahsanalivaraliya@gmail.com',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      description: 'Send an email directly'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/ahsanalivaraliya',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'Connect professionally'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/Ahsanali-07',
      color: 'text-gray-800 dark:text-gray-200',
      bgColor: 'bg-gray-100 dark:bg-gray-800/40',
      description: 'View code repositories'
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      href: 'https://wa.me/917567041309',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      description: 'Chat on WhatsApp'
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-plant-50 dark:bg-plant-900/20 border-b border-border">
        <CardTitle className="text-lg">Get in Touch</CardTitle>
        <CardDescription>Connect with us through various channels</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex flex-col items-center text-center p-4 rounded-xl border border-border hover:border-plant-200 transition-all hover:shadow-sm">
                <div className={`h-12 w-12 rounded-full ${link.bgColor} flex items-center justify-center mb-3`}>
                  <link.icon className={`h-6 w-6 ${link.color}`} />
                </div>
                <h3 className="text-base font-medium mb-1">{link.name}</h3>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialContact;
