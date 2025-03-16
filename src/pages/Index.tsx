
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, BookOpen, Award, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageUploader from '@/components/ui/ImageUploader';
import ResultCard, { Disease } from '@/components/ui/ResultCard';
import Assistant from '@/components/ui/Assistant';
import KnowledgeCard, { KnowledgeItem } from '@/components/ui/KnowledgeCard';
import { useAuth } from '@/contexts/AuthContext';
import { detectDisease } from '@/services/detection';
import { getKnowledgeArticles } from '@/services/knowledge';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Disease | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch knowledge articles from Supabase
  const { data: knowledgeItems = [] } = useQuery({
    queryKey: ['knowledgeArticles'],
    queryFn: getKnowledgeArticles,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const handleImageSelect = async (image: File) => {
    setSelectedImage(image);
    setResult(null);
    
    if (!user) {
      toast.error('Please sign in to analyze plant images', {
        action: {
          label: 'Sign In',
          onClick: () => navigate('/auth/login'),
        },
      });
      return;
    }
    
    // Simulate image analysis
    setIsAnalyzing(true);
    try {
      const result = await detectDisease(image);
      setResult(result);
    } catch (error: any) {
      toast.error(error.message || 'Error analyzing image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-plant-50/80 to-white dark:from-plant-950/20 dark:to-background -z-10" />
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-up">
              <div className="inline-flex items-center justify-center p-2 rounded-full bg-plant-100 text-plant-800 mb-2">
                <Leaf className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">AI-Powered Crop Care</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl text-balance">
                Protect Your Crops with Intelligent Disease Detection
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-[700px] text-balance">
                Upload a photo of your plant and get instant disease detection, treatment recommendations, and preventive care tips.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  size="lg" 
                  className="bg-plant-500 hover:bg-plant-600 text-white"
                  onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate(user ? '/dashboard' : '/auth/register')}
                >
                  {user ? 'Dashboard' : 'Create Account'}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-plant-50/50 dark:bg-transparent border-y border-border">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Activity className="w-5 h-5 text-plant-600" />}
                title="Accurate Disease Detection"
                description="Our AI model accurately identifies crop diseases from a simple photo, providing you with reliable insights."
              />
              <FeatureCard 
                icon={<BookOpen className="w-5 h-5 text-plant-600" />}
                title="Expert Treatment Guidance"
                description="Receive detailed treatment instructions and preventive measures backed by agricultural science."
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-5 h-5 text-plant-600" />}
                title="Preventive Care Support"
                description="Learn how to implement preventive practices that protect your crops before diseases take hold."
              />
            </div>
          </div>
        </section>
        
        {/* Upload Section */}
        <section id="upload-section" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Analyze Your Plant</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Upload a clear image of your plant to get an instant analysis of potential diseases and actionable care instructions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
              <ImageUploader onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />
              
              {result ? (
                <ResultCard disease={result} />
              ) : (
                <div className="rounded-xl border border-border p-8 flex flex-col items-center justify-center text-center h-full bg-muted/40 animate-fade-up">
                  <div className="w-16 h-16 rounded-full bg-plant-100 flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-plant-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Ready to Analyze</h3>
                  <p className="text-muted-foreground mb-2">
                    Upload an image of your plant showing the affected area clearly for the best results.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Our AI model supports various crops including tomatoes, potatoes, corn, wheat, and many more.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Assistant Section */}
        <section className="py-20 bg-gradient-to-b from-white to-plant-50/50 dark:from-background dark:to-plant-950/10 border-y border-border">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Your Intelligent Farming Assistant</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Ask questions, get advice, and receive guidance on any crop-related concerns with our AI assistant.
              </p>
            </div>
            
            <Assistant />
          </div>
        </section>
        
        {/* Knowledge Base Preview */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
                <p className="text-muted-foreground mt-2">
                  Explore our collection of articles, guides, and resources for plant care.
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/knowledge')}>
                View All Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {knowledgeItems.slice(0, 3).map((item) => (
                <KnowledgeCard 
                  key={item.id} 
                  item={item}
                  featured={item.id === '1'} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-plant-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Ready to protect your crops?</h2>
                <p className="text-plant-50">
                  Sign up for free and start using our AI-powered crop disease detection and management system today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-plant-700 hover:bg-plant-50"
                    onClick={() => navigate(user ? '/dashboard' : '/auth/register')}
                  >
                    {user ? 'Go to Dashboard' : 'Get Started Now'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-plant-600"
                    onClick={() => navigate('/knowledge')}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border-4 border-plant-400 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2" 
                  alt="Farmer inspecting crops"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border hover:border-plant-200 transition-all duration-300 hover:shadow-sm">
      <div className="h-12 w-12 rounded-full bg-plant-100 dark:bg-plant-900/30 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default Index;
