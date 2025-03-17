
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type PaymentState = {
  plan?: string;
  price?: string;
};

export default function Payment() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get the plan from location state or default to premium
  const { plan = 'premium', price = '$9.99' } = (location.state as PaymentState) || {};

  // Simulating submission of payment details
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, this would be handled by a real payment processor
      // and there would be server-side code to validate payment
      toast.success(`Successfully subscribed to ${plan} plan!`);
      navigate('/account', { state: { newSubscription: true, plan } });
    }, 1500);
  };

  if (!user) {
    navigate('/auth/login', { state: { from: '/payment' } });
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Header />
      
      <main className="flex-1 container px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/subscription')}
              className="mr-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
          </div>
          
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
              <CardDescription>
                You're signing up for the <span className="font-semibold text-plant-500">{plan}</span> plan at {price}/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input 
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="bg-zinc-800 border-zinc-700 pl-10"
                        required
                      />
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry"
                        placeholder="MM/YY"
                        className="bg-zinc-800 border-zinc-700"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc"
                        placeholder="123"
                        className="bg-zinc-800 border-zinc-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input 
                      id="name"
                      placeholder="John Doe"
                      className="bg-zinc-800 border-zinc-700"
                      required
                    />
                  </div>

                  <div className="rounded-md bg-plant-900/20 p-4 border border-plant-800/30">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-plant-500 mt-0.5 mr-2" />
                      <div className="text-sm text-plant-300">
                        <p className="font-medium">Secure Checkout</p>
                        <p className="text-plant-400 mt-1">This is a demo payment form. No actual charges will be processed.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full mt-6 bg-plant-500 hover:bg-plant-600 text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ${price} per month`}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 text-sm text-zinc-500 pt-4">
              Cancel anytime. No long-term commitment required.
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
