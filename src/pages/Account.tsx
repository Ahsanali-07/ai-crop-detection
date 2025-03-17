
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Settings, Upload, Calendar, LineChart, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LocationState {
  newSubscription?: boolean;
  plan?: string;
}

export default function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  const [userSubscription, setUserSubscription] = useState(localStorage.getItem('userSubscription') || 'free');
  const isPremium = userSubscription !== 'free';
  
  useEffect(() => {
    if (locationState?.newSubscription && locationState?.plan) {
      localStorage.setItem('userSubscription', locationState.plan);
      setUserSubscription(locationState.plan);
      
      toast.success(`Your ${locationState.plan} subscription is now active!`);
      
      window.history.replaceState({}, document.title);
    }
  }, [locationState]);
  
  if (!user) {
    navigate('/auth/login');
    return null;
  }

  const userEmail = user.email || 'No email available';
  const userName = user.user_metadata?.full_name || userEmail.split('@')[0];
  const avatarUrl = user.user_metadata?.avatar_url || null;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Header />
      
      <main className="flex-1 container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="relative">
              <Avatar className={`h-24 w-24 ${isPremium ? 'border-4 border-amber-500/50' : 'border-4 border-plant-500/20'}`}>
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={userName} />
                ) : (
                  <AvatarFallback className={`${isPremium ? 'bg-amber-900 text-amber-100' : 'bg-plant-900 text-plant-100'} text-xl`}>
                    {getInitials(userName)}
                  </AvatarFallback>
                )}
              </Avatar>
              {isPremium && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-black p-1 rounded-full">
                  <Crown className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">{userName}</h1>
              <p className="text-zinc-400">{userEmail}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className={`px-3 py-1 text-sm rounded-full border ${
                  isPremium 
                    ? 'bg-amber-900/30 text-amber-300 border-amber-800/50' 
                    : 'bg-plant-900/30 text-plant-300 border-plant-800/50'
                }`}>
                  {isPremium ? 'Premium Member' : 'Plant Enthusiast'}
                </span>
                
                {isPremium && (
                  <Badge className="bg-amber-500 text-black hover:bg-amber-600 flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    {userSubscription.charAt(0).toUpperCase() + userSubscription.slice(1)} Subscription
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-4 w-full max-w-xl bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger value="profile" className="data-[state=active]:bg-plant-900/30 data-[state=active]:text-plant-100">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="uploads" className="data-[state=active]:bg-plant-900/30 data-[state=active]:text-plant-100">
                <Upload className="h-4 w-4 mr-2" />
                Uploads
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-plant-900/30 data-[state=active]:text-plant-100">
                <Calendar className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-plant-900/30 data-[state=active]:text-plant-100">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>View and manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-zinc-400">Email</h3>
                      <p className="text-zinc-100">{userEmail}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-zinc-400">Member Since</h3>
                      <p className="text-zinc-100">{new Date(user.created_at || '').toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-zinc-400">Subscription Status</h3>
                      <div className="flex items-center gap-2">
                        {isPremium ? (
                          <div className="flex items-center gap-2 text-amber-300">
                            <Crown className="h-5 w-5 text-amber-400" />
                            <span className="font-medium capitalize">{userSubscription} Member</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-zinc-300">
                            <span>Free Plan</span>
                            <Button 
                              size="sm" 
                              onClick={() => navigate('/subscription')}
                              className="bg-plant-500 hover:bg-plant-600 text-white"
                            >
                              Upgrade
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="uploads" className="mt-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Your Uploads</CardTitle>
                  <CardDescription>Images you've analyzed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center text-zinc-400">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-zinc-500" />
                    <p>You haven't uploaded any images yet</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Analysis History</CardTitle>
                  <CardDescription>Your plant diagnosis history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center text-zinc-400">
                    <LineChart className="h-10 w-10 mx-auto mb-4 text-zinc-500" />
                    <p>No analysis history found</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center text-zinc-400">
                    <Settings className="h-10 w-10 mx-auto mb-4 text-zinc-500" />
                    <p>Settings will be available soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

