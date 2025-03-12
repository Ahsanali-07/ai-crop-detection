
import React from 'react';
import { ArrowRight, BookOpen, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KnowledgeCard, { KnowledgeItem } from '@/components/ui/KnowledgeCard';

// Mock knowledge base articles
const allKnowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    title: 'Understanding Common Tomato Diseases',
    category: 'Disease Guide',
    excerpt: 'Learn about the most common diseases affecting tomato plants, including early blight, late blight, and septoria leaf spot, with detailed identification and treatment information.',
    imageSrc: 'https://images.unsplash.com/photo-1601383835394-c8679d76a254',
    imageAlt: 'Tomato plants',
    slug: 'understanding-tomato-diseases',
  },
  {
    id: '2',
    title: 'Organic Methods for Controlling Aphids',
    category: 'Pest Control',
    excerpt: 'Discover natural and organic methods to control aphid infestations on your crops without resorting to harmful chemical pesticides.',
    imageSrc: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf',
    imageAlt: 'Plant with aphids',
    slug: 'organic-aphid-control',
  },
  {
    id: '3',
    title: 'Best Practices for Crop Rotation',
    category: 'Farming Guide',
    excerpt: 'Explore the benefits of crop rotation and learn how to implement an effective rotation schedule to improve soil health and reduce disease pressure.',
    imageSrc: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
    imageAlt: 'Farm field with different crops',
    slug: 'crop-rotation-best-practices',
  },
  {
    id: '4',
    title: 'Managing Powdery Mildew in Cucurbits',
    category: 'Disease Guide',
    excerpt: 'Powdery mildew is a common fungal disease affecting cucumbers, squash, and melons. Learn how to identify, treat, and prevent this yield-reducing condition.',
    imageSrc: 'https://images.unsplash.com/photo-1528825871115-3581a5387919',
    imageAlt: 'Cucumber plants',
    slug: 'powdery-mildew-cucurbits',
  },
  {
    id: '5',
    title: 'Understanding Soil pH and Plant Health',
    category: 'Soil Management',
    excerpt: 'Soil pH significantly impacts nutrient availability and plant health. Discover how to test, adjust, and maintain optimal pH levels for different crops.',
    imageSrc: 'https://images.unsplash.com/photo-1563911892437-1feda0b63221',
    imageAlt: 'Soil testing',
    slug: 'soil-ph-plant-health',
  },
  {
    id: '6',
    title: 'Integrated Pest Management Strategies',
    category: 'Pest Control',
    excerpt: 'IPM combines biological, cultural, physical, and chemical methods to minimize pest damage with the least risk to people and the environment.',
    imageSrc: 'https://images.unsplash.com/photo-1472152072161-e3db84fd1580',
    imageAlt: 'Natural pest predator',
    slug: 'integrated-pest-management',
  },
  {
    id: '7',
    title: 'Water Conservation Techniques for Farmers',
    category: 'Farming Guide',
    excerpt: 'Implement effective water conservation strategies to reduce waste, lower costs, and create a more sustainable farming operation.',
    imageSrc: 'https://images.unsplash.com/photo-1559884743-74e73939fb0f',
    imageAlt: 'Drip irrigation system',
    slug: 'water-conservation-farming',
  },
  {
    id: '8',
    title: 'Identifying and Managing Nutrient Deficiencies',
    category: 'Plant Nutrition',
    excerpt: 'Learn to recognize the visual symptoms of various nutrient deficiencies and how to correct them through proper fertilization practices.',
    imageSrc: 'https://images.unsplash.com/photo-1512467526322-196204441393',
    imageAlt: 'Plant with nutrient deficiency',
    slug: 'nutrient-deficiencies',
  },
  {
    id: '9',
    title: 'Sustainable Weed Management Practices',
    category: 'Farming Guide',
    excerpt: 'Explore eco-friendly approaches to weed control that reduce herbicide use while effectively managing unwanted plant competition.',
    imageSrc: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb5d45d',
    imageAlt: 'Farmer weeding field',
    slug: 'sustainable-weed-management',
  },
];

// Extract unique categories for filters
const categories = Array.from(new Set(allKnowledgeItems.map(item => item.category)));

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  // Filter items based on search query and selected category
  const filteredItems = React.useMemo(() => {
    return allKnowledgeItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-plant-50/50 dark:bg-plant-950/10 border-b border-border">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-plant-100 text-plant-800 mb-2">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Knowledge Base</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Plant Care & Disease Management Resources
              </h1>
              
              <p className="text-muted-foreground">
                Explore our comprehensive collection of articles, guides, and resources to help you care for your crops and manage plant diseases effectively.
              </p>
              
              <div className="relative mt-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for articles, guides, and more..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters Section */}
        <section className="py-6 border-b border-border">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by category:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Badge>
                  {categories.map(category => (
                    <Badge 
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Sort</span>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {filteredItems.length} {filteredItems.length === 1 ? 'Resource' : 'Resources'} Available
              </h2>
              
              {selectedCategory && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-muted-foreground"
                >
                  Clear filter
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <KnowledgeCard 
                  key={item.id} 
                  item={item}
                  className="h-full"
                />
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any resources matching your search criteria.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-plant-50/50 dark:bg-plant-950/10 border-t border-border">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Stay Updated with Plant Care Tips
              </h2>
              
              <p className="text-muted-foreground">
                Subscribe to our newsletter for the latest articles, seasonal advice, and plant care insights delivered to your inbox.
              </p>
              
              <div className="flex gap-2 mt-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-sm"
                />
                <Button>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
