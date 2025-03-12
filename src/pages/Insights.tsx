
import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronDown, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Calendar, Download, Share2 } from 'lucide-react';

// Mock data for disease trends
const diseaseTrendData = [
  { month: 'Jan', earlyBlight: 65, lateBlight: 40, powderyMildew: 24 },
  { month: 'Feb', earlyBlight: 59, lateBlight: 45, powderyMildew: 30 },
  { month: 'Mar', earlyBlight: 80, lateBlight: 36, powderyMildew: 28 },
  { month: 'Apr', earlyBlight: 81, lateBlight: 42, powderyMildew: 33 },
  { month: 'May', earlyBlight: 56, lateBlight: 60, powderyMildew: 42 },
  { month: 'Jun', earlyBlight: 55, lateBlight: 50, powderyMildew: 35 },
  { month: 'Jul', earlyBlight: 40, lateBlight: 45, powderyMildew: 30 },
  { month: 'Aug', earlyBlight: 30, lateBlight: 48, powderyMildew: 25 },
  { month: 'Sep', earlyBlight: 35, lateBlight: 38, powderyMildew: 20 },
  { month: 'Oct', earlyBlight: 45, lateBlight: 30, powderyMildew: 15 },
  { month: 'Nov', earlyBlight: 50, lateBlight: 25, powderyMildew: 18 },
  { month: 'Dec', earlyBlight: 58, lateBlight: 35, powderyMildew: 21 },
];

// Mock data for crop distribution
const cropDistributionData = [
  { name: 'Tomato', value: 35 },
  { name: 'Potato', value: 25 },
  { name: 'Wheat', value: 20 },
  { name: 'Rice', value: 15 },
  { name: 'Others', value: 5 },
];

// Mock data for treatment effectiveness
const treatmentEffectivenessData = [
  { treatment: 'Organic Fungicide', effectiveness: 75 },
  { treatment: 'Chemical Fungicide', effectiveness: 90 },
  { treatment: 'Crop Rotation', effectiveness: 65 },
  { treatment: 'Resistant Varieties', effectiveness: 85 },
  { treatment: 'Proper Spacing', effectiveness: 60 },
  { treatment: 'Water Management', effectiveness: 70 },
];

// Mock weather impact data
const weatherImpactData = [
  { date: 'Week 1', humidity: 60, temperature: 25, diseaseIndex: 45 },
  { date: 'Week 2', humidity: 70, temperature: 28, diseaseIndex: 65 },
  { date: 'Week 3', humidity: 80, temperature: 30, diseaseIndex: 85 },
  { date: 'Week 4', humidity: 75, temperature: 29, diseaseIndex: 75 },
  { date: 'Week 5', humidity: 65, temperature: 26, diseaseIndex: 55 },
  { date: 'Week 6', humidity: 55, temperature: 23, diseaseIndex: 35 },
  { date: 'Week 7', humidity: 60, temperature: 24, diseaseIndex: 40 },
  { date: 'Week 8', humidity: 70, temperature: 27, diseaseIndex: 60 },
];

// Colors for pie chart
const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];

const Insights = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [cropType, setCropType] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Crop Insights & Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive analytics and trends for crop disease management
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue={cropType} onValueChange={setCropType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  <SelectItem value="tomato">Tomatoes</SelectItem>
                  <SelectItem value="potato">Potatoes</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Download className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="trends" className="flex items-center">
                <LineChartIcon className="mr-2 h-4 w-4" />
                Disease Trends
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center">
                <PieChartIcon className="mr-2 h-4 w-4" />
                Crop Distribution
              </TabsTrigger>
              <TabsTrigger value="effectiveness" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Treatment Effectiveness
              </TabsTrigger>
              <TabsTrigger value="weather" className="flex items-center">
                <ChevronDown className="mr-2 h-4 w-4" />
                Weather Impact
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Disease Occurrence Trends</CardTitle>
                  <CardDescription>
                    Monthly disease occurrence reports for major crop diseases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={diseaseTrendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="earlyBlight" 
                          stroke="#4CAF50" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="lateBlight" 
                          stroke="#FF9800" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="powderyMildew" 
                          stroke="#2196F3" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Early Blight" 
                  value="54%" 
                  trend="+12%" 
                  description="Increase since last month" 
                  trendDirection="up"
                />
                <StatCard 
                  title="Late Blight" 
                  value="38%" 
                  trend="-5%" 
                  description="Decrease since last month" 
                  trendDirection="down"
                />
                <StatCard 
                  title="Powdery Mildew" 
                  value="26%" 
                  trend="+3%" 
                  description="Increase since last month" 
                  trendDirection="up"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="distribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Distribution</CardTitle>
                  <CardDescription>
                    Distribution of crops in the analyzed samples
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center">
                  <div className="h-[300px] w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cropDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {cropDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
                    <h4 className="text-lg font-medium mb-4">Key Insights</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#4CAF50] mr-2"></div>
                        <span>Tomatoes make up the largest portion of analyzed crops at 35%</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#8BC34A] mr-2"></div>
                        <span>Potatoes are the second most common crop at 25%</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#CDDC39] mr-2"></div>
                        <span>Wheat accounts for 20% of all analyzed samples</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#FFC107] mr-2"></div>
                        <span>Rice represents 15% of the total crop distribution</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="effectiveness" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Effectiveness</CardTitle>
                  <CardDescription>
                    Effectiveness ratings for various disease treatment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={treatmentEffectivenessData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="treatment" type="category" width={150} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar 
                          dataKey="effectiveness" 
                          name="Effectiveness (%)" 
                          fill="#4CAF50" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weather" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weather Impact on Disease Prevalence</CardTitle>
                  <CardDescription>
                    Correlation between weather conditions and disease index
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={weatherImpactData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="humidity" 
                          name="Humidity (%)" 
                          stackId="1"
                          stroke="#8884d8" 
                          fill="#8884d880" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="temperature" 
                          name="Temperature (°C)" 
                          stackId="2"
                          stroke="#ffc658" 
                          fill="#ffc65880" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="diseaseIndex" 
                          name="Disease Index" 
                          stackId="3"
                          stroke="#4CAF50" 
                          fill="#4CAF5080" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Correlation Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Statistical analysis of weather factors impact on disease prevalence
                    </p>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center pb-2 border-b">
                        <span>Humidity correlation</span>
                        <span className="font-medium">0.87 (Strong)</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b">
                        <span>Temperature correlation</span>
                        <span className="font-medium">0.65 (Moderate)</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b">
                        <span>Rainfall correlation</span>
                        <span className="font-medium">0.72 (Strong)</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Wind speed correlation</span>
                        <span className="font-medium">0.31 (Weak)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Risk Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upcoming disease risk predictions based on weather forecasts
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Early Blight Risk</p>
                          <p className="text-sm text-muted-foreground">Next 7 days</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs font-medium">High</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Late Blight Risk</p>
                          <p className="text-sm text-muted-foreground">Next 7 days</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-medium">Medium</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Powdery Mildew Risk</p>
                          <p className="text-sm text-muted-foreground">Next 7 days</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium">Low</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  description: string;
  trendDirection: 'up' | 'down';
};

const StatCard = ({ title, value, trend, description, trendDirection }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline mt-2">
            <p className="text-3xl font-bold">{value}</p>
            <span className={cn(
              "ml-2 text-sm font-medium",
              trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              {trend}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
