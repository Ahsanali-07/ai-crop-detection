import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, History, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data for disease trends
const diseaseTrendsData = [
  { month: 'Jan', earlyBlight: 4, lateBlight: 2, powderyMildew: 1 },
  { month: 'Feb', earlyBlight: 3, lateBlight: 1, powderyMildew: 2 },
  { month: 'Mar', earlyBlight: 5, lateBlight: 3, powderyMildew: 4 },
  { month: 'Apr', earlyBlight: 7, lateBlight: 5, powderyMildew: 3 },
  { month: 'May', earlyBlight: 9, lateBlight: 7, powderyMildew: 5 },
  { month: 'Jun', earlyBlight: 8, lateBlight: 6, powderyMildew: 4 },
  { month: 'Jul', earlyBlight: 10, lateBlight: 8, powderyMildew: 6 },
];

// Mock data for crop health
const cropHealthData = [
  { crop: 'Tomatoes', health: 75 },
  { crop: 'Potatoes', health: 85 },
  { crop: 'Corn', health: 90 },
  { crop: 'Wheat', health: 65 },
  { crop: 'Rice', health: 80 },
];

// Mock data for treatment effectiveness
const treatmentEffectivenessData = [
  { name: 'Organic', value: 40 },
  { name: 'Chemical', value: 30 },
  { name: 'Biological', value: 20 },
  { name: 'Mechanical', value: 10 },
];

const COLORS = ['#4e9e57', '#74ba7b', '#9ed3a2', '#c2e6c4'];

// Mock weather conditions data
const weatherConditionsData = [
  {
    crop: 'Tomatoes',
    temperature: '18-29°C',
    humidity: '65-75%',
    rainfall: '400-600mm',
    description: 'Tomatoes thrive in warm conditions with moderate humidity and consistent moisture.'
  },
  {
    crop: 'Potatoes',
    temperature: '15-20°C',
    humidity: '60-70%',
    rainfall: '500-700mm',
    description: 'Potatoes prefer cooler temperatures and consistent soil moisture for optimal tuber development.'
  },
  {
    crop: 'Corn',
    temperature: '20-30°C',
    humidity: '50-80%',
    rainfall: '500-800mm',
    description: 'Corn requires warm temperatures and adequate rainfall, especially during the silking stage.'
  },
  {
    crop: 'Wheat',
    temperature: '15-24°C',
    humidity: '40-60%',
    rainfall: '375-875mm',
    description: 'Wheat grows best in cool, dry conditions with moderate rainfall during the growing season.'
  },
];

// Mock history data
const historyData = [
  {
    id: 1,
    date: '2023-07-15',
    crop: 'Tomatoes',
    disease: 'Early Blight',
    confidence: '92%',
    treatment: 'Applied organic fungicide, increased plant spacing',
    status: 'Resolved'
  },
  {
    id: 2,
    date: '2023-08-02',
    crop: 'Potatoes',
    disease: 'Late Blight',
    confidence: '88%',
    treatment: 'Removed affected leaves, applied copper-based spray',
    status: 'In Progress'
  },
  {
    id: 3,
    date: '2023-08-20',
    crop: 'Corn',
    disease: 'Corn Smut',
    confidence: '94%',
    treatment: 'Crop rotation implemented, resistant varieties planted',
    status: 'Monitoring'
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Crop Health Dashboard</h1>
              <p className="text-muted-foreground">Monitor disease trends, crop health, and treatment effectiveness</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-plant-500 hover:bg-plant-600 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Report
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="graphs" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="graphs" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Insights</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="mr-2 h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="weather" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8a7 7 0 1 0-13.7 0"/><path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
                <span>Weather</span>
              </TabsTrigger>
              <TabsTrigger value="treatment" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                <span>Treatment</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="graphs" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Disease Trends Chart */}
                <Card className="col-span-full lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChartIcon className="mr-2 h-5 w-5 text-plant-600" />
                      Disease Trends
                    </CardTitle>
                    <CardDescription>Monthly disease occurrence by type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={diseaseTrendsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="earlyBlight" stroke="#4e9e57" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="lateBlight" stroke="#9ed3a2" />
                          <Line type="monotone" dataKey="powderyMildew" stroke="#c2e6c4" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Crop Health Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-plant-600" />
                      Crop Health
                    </CardTitle>
                    <CardDescription>Overall health by crop type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cropHealthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="crop" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="health" fill="#4e9e57" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Treatment Effectiveness Chart */}
                <Card className="col-span-full lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChartIcon className="mr-2 h-5 w-5 text-plant-600" />
                      Treatment Effectiveness
                    </CardTitle>
                    <CardDescription>Success rate by treatment type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={treatmentEffectivenessData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {treatmentEffectivenessData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="mr-2 h-5 w-5 text-plant-600" />
                    Disease Detection History
                  </CardTitle>
                  <CardDescription>Record of previous crop disease detections and treatments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Crop</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Disease</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Confidence</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Treatment</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData.map((item) => (
                          <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">{item.date}</td>
                            <td className="py-3 px-4">{item.crop}</td>
                            <td className="py-3 px-4">{item.disease}</td>
                            <td className="py-3 px-4">{item.confidence}</td>
                            <td className="py-3 px-4">{item.treatment}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === 'Resolved' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                  : item.status === 'In Progress'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    View Full History
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="weather">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-plant-600"><path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8a7 7 0 1 0-13.7 0"/><path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
                    Optimal Weather Conditions
                  </CardTitle>
                  <CardDescription>Recommended weather conditions for optimal crop growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {weatherConditionsData.map((item, index) => (
                      <div key={index} className="rounded-xl p-5 border border-border hover:border-plant-200 transition-all">
                        <h3 className="text-xl font-semibold mb-3">{item.crop}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-plant-600"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                            <span className="text-sm font-medium mr-2">Temperature:</span>
                            <span className="text-sm text-muted-foreground">{item.temperature}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-plant-600"><path d="M12 22V2"/><path d="M5 12H2"/><path d="M22 12h-3"/><path d="M12 5V2"/><path d="M12 22v-3"/></svg>
                            <span className="text-sm font-medium mr-2">Humidity:</span>
                            <span className="text-sm text-muted-foreground">{item.humidity}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-plant-600"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
                            <span className="text-sm font-medium mr-2">Rainfall:</span>
                            <span className="text-sm text-muted-foreground">{item.rainfall}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="treatment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-plant-600"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                    Expert Treatment Guidance
                  </CardTitle>
                  <CardDescription>AI-generated treatment recommendations based on detected diseases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl p-5 border border-plant-200 bg-plant-50/50 dark:bg-plant-900/20 dark:border-plant-800/30">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-plant-500 mr-2"></span>
                      Tomato Early Blight Treatment Plan
                    </h3>
                    
                    <div className="space-y-4 mt-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Immediate Actions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Remove and destroy all affected leaves to prevent spread</li>
                          <li className="text-sm">Apply copper-based fungicide to remaining healthy foliage</li>
                          <li className="text-sm">Ensure proper spacing between plants for better air circulation</li>
                          <li className="text-sm">Water at the base of plants to keep foliage dry</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Preventive Measures:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Practice crop rotation (avoid planting tomatoes in the same spot for 3-4 years)</li>
                          <li className="text-sm">Use disease-resistant varieties in future plantings</li>
                          <li className="text-sm">Apply mulch to prevent soil-borne spores from splashing onto leaves</li>
                          <li className="text-sm">Maintain consistent watering schedule to avoid plant stress</li>
                          <li className="text-sm">Remove and destroy all plant debris at the end of the growing season</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Monitoring Schedule:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Check plants daily for the first week after treatment</li>
                          <li className="text-sm">Reapply fungicide every 7-10 days during favorable disease conditions</li>
                          <li className="text-sm">Document disease progression and treatment effectiveness for future reference</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-plant-200 dark:border-plant-800/30">
                      <Button className="bg-plant-500 hover:bg-plant-600 text-white w-full sm:w-auto">
                        Generate Custom Treatment Plan
                      </Button>
                    </div>
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
};

export default Dashboard;
