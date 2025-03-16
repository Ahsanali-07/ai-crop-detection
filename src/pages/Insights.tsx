
import React, { useState, useEffect } from 'react';
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
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  generateDiseaseTrendData,
  generateCropDistributionData,
  generateTreatmentEffectivenessData, 
  generateWeatherImpactData,
  exportToCSV
} from '@/utils/dataGenerators';
import { supabase } from "@/integrations/supabase/client";

// Colors for pie chart
const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];

const Insights = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('year');
  const [cropType, setCropType] = useState('all');
  const [activeTab, setActiveTab] = useState('trends');
  
  // State for chart data
  const [diseaseTrendData, setDiseaseTrendData] = useState(generateDiseaseTrendData());
  const [cropDistributionData, setCropDistributionData] = useState(generateCropDistributionData());
  const [treatmentEffectivenessData, setTreatmentEffectivenessData] = useState(generateTreatmentEffectivenessData());
  const [weatherImpactData, setWeatherImpactData] = useState(generateWeatherImpactData());

  // Generate new data on component mount
  useEffect(() => {
    regenerateData();
    fetchDataFromSupabase();
  }, []);

  // Apply filters when timeRange or cropType changes
  useEffect(() => {
    applyFilters();
  }, [timeRange, cropType]);

  // Fetch data from Supabase if available
  const fetchDataFromSupabase = async () => {
    try {
      // Try to fetch disease trends data
      const { data: trendData, error: trendError } = await supabase
        .from('disease_trends')
        .select('*');
      
      if (trendData && trendData.length > 0 && !trendError) {
        setDiseaseTrendData(trendData);
      }
      
      // Try to fetch crop distribution data
      const { data: cropData, error: cropError } = await supabase
        .from('crop_distribution')
        .select('*');
      
      if (cropData && cropData.length > 0 && !cropError) {
        setCropDistributionData(cropData);
      }
      
      // Try to fetch treatment effectiveness data
      const { data: treatmentData, error: treatmentError } = await supabase
        .from('treatment_effectiveness')
        .select('*');
      
      if (treatmentData && treatmentData.length > 0 && !treatmentError) {
        setTreatmentEffectivenessData(treatmentData);
      }
      
      // Try to fetch weather impact data
      const { data: weatherData, error: weatherError } = await supabase
        .from('weather_impacts')
        .select('*');
      
      if (weatherData && weatherData.length > 0 && !weatherError) {
        setWeatherImpactData(weatherData);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
      // If there's an error, we'll use the generated data
    }
  };

  // Regenerate all chart data
  const regenerateData = () => {
    setDiseaseTrendData(generateDiseaseTrendData());
    setCropDistributionData(generateCropDistributionData());
    setTreatmentEffectivenessData(generateTreatmentEffectivenessData());
    setWeatherImpactData(generateWeatherImpactData());
    
    toast({
      title: "Data refreshed",
      description: "Chart data has been regenerated",
    });
  };

  // Apply filters based on timeRange and cropType
  const applyFilters = () => {
    // Filter disease trend data based on time range
    let filteredDiseaseTrendData = generateDiseaseTrendData();
    if (timeRange === 'month') {
      filteredDiseaseTrendData = filteredDiseaseTrendData.slice(0, 1);
    } else if (timeRange === 'quarter') {
      filteredDiseaseTrendData = filteredDiseaseTrendData.slice(0, 3);
    } else if (timeRange === 'year') {
      // Use all data
    }

    // Filter crop distribution data based on crop type
    let filteredCropDistribution = generateCropDistributionData();
    if (cropType !== 'all') {
      // Focus on the selected crop by increasing its value
      filteredCropDistribution = filteredCropDistribution.map(item => {
        if (item.name.toLowerCase() === cropType) {
          return { ...item, value: item.value * 1.5 };
        }
        return item;
      });
    }

    setDiseaseTrendData(filteredDiseaseTrendData);
    setCropDistributionData(filteredCropDistribution);
    setTreatmentEffectivenessData(generateTreatmentEffectivenessData());
    setWeatherImpactData(generateWeatherImpactData());
    
    toast({
      title: "Filters applied",
      description: `Time range: ${timeRange}, Crop type: ${cropType}`,
    });
  };

  // Handle download button click
  const handleDownload = () => {
    let dataToExport;
    let filename;
    
    switch (activeTab) {
      case 'trends':
        dataToExport = diseaseTrendData;
        filename = `disease_trends_${timeRange}`;
        break;
      case 'distribution':
        dataToExport = cropDistributionData;
        filename = `crop_distribution_${cropType}`;
        break;
      case 'effectiveness':
        dataToExport = treatmentEffectivenessData;
        filename = 'treatment_effectiveness';
        break;
      case 'weather':
        dataToExport = weatherImpactData;
        filename = 'weather_impacts';
        break;
      default:
        dataToExport = diseaseTrendData;
        filename = 'crop_insights';
    }
    
    exportToCSV(dataToExport, filename);
    
    toast({
      title: "Download started",
      description: `${filename}.csv is being downloaded`,
    });
  };

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
              <Select defaultValue={timeRange} value={timeRange} onValueChange={setTimeRange}>
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
              
              <Select defaultValue={cropType} value={cropType} onValueChange={setCropType}>
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
              
              <Button variant="outline" size="icon" className="h-10 w-10" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" className="h-10 w-10" onClick={regenerateData}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="trends" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  value={`${Math.floor(Math.random() * 30) + 40}%`} 
                  trend={`${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 15) + 2}%`} 
                  description="Increase since last month" 
                  trendDirection={Math.random() > 0.5 ? 'up' : 'down'}
                />
                <StatCard 
                  title="Late Blight" 
                  value={`${Math.floor(Math.random() * 30) + 30}%`} 
                  trend={`${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 15) + 2}%`}
                  description="Change since last month" 
                  trendDirection={Math.random() > 0.5 ? 'up' : 'down'}
                />
                <StatCard 
                  title="Powdery Mildew" 
                  value={`${Math.floor(Math.random() * 20) + 20}%`}
                  trend={`${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 15) + 2}%`}
                  description="Change since last month" 
                  trendDirection={Math.random() > 0.5 ? 'up' : 'down'}
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
                      {cropDistributionData.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{item.name} makes up {item.value}% of analyzed crops</span>
                        </li>
                      ))}
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
                        <span className="font-medium">{(Math.random() * 0.3 + 0.6).toFixed(2)} (Strong)</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b">
                        <span>Temperature correlation</span>
                        <span className="font-medium">{(Math.random() * 0.3 + 0.5).toFixed(2)} (Moderate)</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b">
                        <span>Rainfall correlation</span>
                        <span className="font-medium">{(Math.random() * 0.3 + 0.6).toFixed(2)} (Strong)</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Wind speed correlation</span>
                        <span className="font-medium">{(Math.random() * 0.3 + 0.1).toFixed(2)} (Weak)</span>
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          Math.random() > 0.6 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                            : Math.random() > 0.4 
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}>
                          {Math.random() > 0.6 ? "High" : Math.random() > 0.4 ? "Medium" : "Low"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Late Blight Risk</p>
                          <p className="text-sm text-muted-foreground">Next 7 days</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          Math.random() > 0.6 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                            : Math.random() > 0.4 
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}>
                          {Math.random() > 0.6 ? "High" : Math.random() > 0.4 ? "Medium" : "Low"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Powdery Mildew Risk</p>
                          <p className="text-sm text-muted-foreground">Next 7 days</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          Math.random() > 0.6 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                            : Math.random() > 0.4 
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}>
                          {Math.random() > 0.6 ? "High" : Math.random() > 0.4 ? "Medium" : "Low"}
                        </span>
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
