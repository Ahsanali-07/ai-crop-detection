
import { ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type KnowledgeItem = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
};

type KnowledgeCardProps = {
  item: KnowledgeItem;
  className?: string;
  featured?: boolean;
};

export default function KnowledgeCard({ item, className, featured = false }: KnowledgeCardProps) {
  return (
    <div 
      className={cn(
        "group rounded-xl overflow-hidden border border-border bg-card transition-all duration-300",
        "hover:shadow-md hover:border-plant-200 dark:hover:border-plant-800",
        featured ? "md:col-span-2" : "",
        className
      )}
    >
      <div className={cn(
        "grid gap-4",
        featured ? "md:grid-cols-2" : "grid-cols-1"
      )}>
        <div className="relative overflow-hidden">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          )} />
          
          <img 
            src={item.imageSrc} 
            alt={item.imageAlt}
            className={cn(
              "aspect-[16/9] w-full object-cover",
              "transition-transform duration-500 group-hover:scale-105"
            )}
          />
          
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">
              {item.category}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-plant-700 dark:group-hover:text-plant-300 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {item.excerpt}
          </p>
          
          <Button 
            variant="outline" 
            size="sm"
            className="group-hover:bg-plant-50 group-hover:text-plant-700 group-hover:border-plant-200 transition-colors"
          >
            <BookOpen className="mr-1 h-4 w-4" />
            Read more
            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
