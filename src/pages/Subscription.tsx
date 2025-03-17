
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Check, Crown, ChevronRight, AlertCircle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic access to plant identification features',
    price: '$0',
    period: 'forever',
    features: [
      'Plant identification (5/day)',
      'Basic disease detection',
      'Community forum access',
      'Limited knowledge base'
    ],
    recommended: false,
    buttonText: 'Current Plan',
    disabled: true
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Enhanced features for serious plant enthusiasts',
    price: '$9.99',
    period: 'per month',
    features: [
      'Unlimited plant identification',
      'Advanced disease detection',
      'Treatment recommendations',
      'Full knowledge base access',
      'Email support'
    ],
    recommended: true,
    buttonText: 'Subscribe Now',
    disabled: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for professional growers',
    price: '$24.99',
    period: 'per month',
    features: [
      'Everything in Premium',
      'API access',
      'Priority analysis',
      'Custom reporting tools',
      'Dedicated support agent',
      'Team collaboration tools'
    ],
    recommended: false,
    buttonText: 'Contact Sales',
    disabled: false
  }
];

export default function Subscription() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth/login', { state: { from: '/subscription' } });
    return null;
  }

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      return;
    } else if (planId === 'enterprise') {
      toast.info('Our sales team will contact you shortly');
    } else {
      toast.success(`You selected the ${planId} plan`);
      // Here you would typically redirect to a payment page
      // navigate('/payment', { state: { plan: planId } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Header />
      
      <main className="flex-1 container px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Subscription Plans</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Upgrade your PlantCare experience with advanced features and premium benefits. 
              Choose the plan that's right for you.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`bg-zinc-900/50 border-zinc-800 relative flex flex-col h-full transition-all ${
                  plan.recommended ? 'ring-2 ring-plant-500' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-plant-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                )}
                
                <CardHeader className={plan.recommended ? 'pt-8' : ''}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    {plan.id === 'premium' && (
                      <Crown className="h-6 w-6 text-amber-400" />
                    )}
                  </div>
                  <CardDescription className="text-zinc-400">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-zinc-400 ml-2">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-plant-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={plan.disabled}
                    className={`w-full ${
                      plan.recommended 
                        ? 'bg-plant-500 hover:bg-plant-600 text-white' 
                        : plan.id === 'free' 
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                  >
                    {plan.buttonText}
                    {!plan.disabled && <ChevronRight className="h-4 w-4 ml-2" />}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-zinc-900/30 border border-zinc-800 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-lg text-white mb-2">Important Note</h3>
                <p className="text-zinc-400">
                  This is a demo subscription page. No actual charges will be processed. 
                  In a real application, this would connect to a payment processor like Stripe.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">VIP Benefits</h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              <VipBenefit 
                title="Personal Plant Expert" 
                description="Get access to a dedicated plant expert for personalized advice" 
              />
              <VipBenefit 
                title="Early Access" 
                description="Be the first to try new features and updates" 
              />
              <VipBenefit 
                title="Exclusive Content" 
                description="Access premium articles and video tutorials" 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

interface VipBenefitProps {
  title: string;
  description: string;
}

function VipBenefit({ title, description }: VipBenefitProps) {
  return (
    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
      <h3 className="font-semibold text-lg text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}
