
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, SendHorizontal, Mic, ChevronDown, Bot, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  structuredResponse?: {
    symptoms?: string[];
    causes?: string[];
    prevention?: string[];
    treatments?: string[];
    insights?: string[];
  };
};

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your plant care assistant. How can I help you with your crops today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate assistant typing
    setIsTyping(true);
    
    // Simulate assistant response with enhanced variety
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(input),
        sender: 'assistant',
        timestamp: new Date(),
        structuredResponse: getStructuredResponse(input),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getStructuredResponse = (userInput: string): Message['structuredResponse'] | undefined => {
    const normalizedInput = userInput.toLowerCase();
    
    // Only return structured data for certain types of queries
    if (normalizedInput.includes('disease') || 
        normalizedInput.includes('infection') || 
        normalizedInput.includes('treatment') ||
        normalizedInput.includes('fungal') ||
        normalizedInput.includes('blight') ||
        normalizedInput.includes('rot')) {
      
      // Different structured responses based on context
      if (normalizedInput.includes('tomato')) {
        return {
          symptoms: [
            "Dark spots with concentric rings on leaves",
            "Yellowing around the spots",
            "Lesions on stems and fruits",
            "Progressive wilting of foliage"
          ],
          causes: [
            "Alternaria solani fungus",
            "Warm, humid conditions (75-85°F)",
            "Poor air circulation",
            "Extended leaf wetness (6+ hours)"
          ],
          prevention: [
            "Use disease-resistant varieties",
            "Rotate crops every 2-3 years",
            "Provide adequate plant spacing (24-36 inches)",
            "Water at the base, avoid wetting leaves",
            "Apply preventative organic fungicides during humid weather"
          ],
          treatments: [
            "Organic: Copper-based fungicides, neem oil, or potassium bicarbonate",
            "Conventional: Chlorothalonil or mancozeb-based products",
            "Biological: Bacillus subtilis preparations",
            "Cultural: Remove and destroy infected plants/leaves"
          ],
          insights: [
            "Early detection significantly improves treatment success",
            "Most effective control is through prevention",
            "Stressed plants are more susceptible to infection",
            "Consider companion planting with basil to deter pests"
          ]
        };
      } else if (normalizedInput.includes('wheat')) {
        return {
          symptoms: [
            "Orange-brown pustules on leaves and stems",
            "Stunted growth and reduced yield",
            "Black stem rust in later stages",
            "Yellowing of infected tissue"
          ],
          causes: [
            "Puccinia species fungi",
            "Mild, humid conditions",
            "Monoculture practices",
            "Wind-borne dispersal of spores"
          ],
          prevention: [
            "Plant resistant varieties",
            "Early planting to avoid peak rust season",
            "Crop rotation with non-cereal crops",
            "Proper field sanitation, remove volunteer wheat"
          ],
          treatments: [
            "Triazole fungicides (propiconazole, tebuconazole)",
            "Strobilurin fungicides for early application",
            "Application timing: at stem elongation and flag leaf emergence",
            "Monitor regularly for early detection and treatment"
          ],
          insights: [
            "New rust races can overcome resistance within 3-5 years",
            "Regional forecasting systems can predict rust outbreaks",
            "Integrated management approach is most effective",
            "Consider weather patterns when planning application timing"
          ]
        };
      } else if (normalizedInput.includes('potato')) {
        return {
          symptoms: [
            "Dark, water-soaked spots on leaves",
            "White fuzzy growth on leaf undersides",
            "Rapid browning and death of foliage",
            "Tuber rot with reddish-brown granular tissue"
          ],
          causes: [
            "Phytophthora infestans oomycete",
            "Cool, wet weather (60-70°F with high humidity)",
            "Infected seed potatoes",
            "Overwintering in soil and plant debris"
          ],
          prevention: [
            "Use certified disease-free seed potatoes",
            "Plant resistant varieties like 'Sarpo Mira' or 'Defender'",
            "Proper hilling to protect tubers",
            "Adequate spacing for ventilation (30-36 inches between rows)"
          ],
          treatments: [
            "Copper-based fungicides applied preventatively",
            "Systemic fungicides containing metalaxyl or cymoxanil",
            "Organic: Compost tea sprays with beneficial microbes",
            "Remove and destroy infected plants immediately"
          ],
          insights: [
            "Late blight was responsible for the Irish Potato Famine",
            "Can destroy an entire crop within 7-10 days in favorable conditions",
            "Preventive applications are far more effective than curative ones",
            "Weather monitoring systems can help predict infection periods"
          ]
        };
      } else if (normalizedInput.includes('fungal') || normalizedInput.includes('infection')) {
        return {
          symptoms: [
            "Discoloration (spots, lesions, or powdery growth)",
            "Wilting despite adequate moisture",
            "Stunted or abnormal growth",
            "Visible fungal structures (mycelium, fruiting bodies)"
          ],
          causes: [
            "Various fungal pathogens (species-specific)",
            "Environmental stress weakening plant defenses",
            "Poor air circulation and high humidity",
            "Contaminated soil, tools, or plant material"
          ],
          prevention: [
            "Crop rotation with non-susceptible plants",
            "Proper spacing for airflow",
            "Avoiding overhead irrigation",
            "Sanitation of tools and removal of plant debris",
            "Use of disease-resistant varieties when available"
          ],
          treatments: [
            "Cultural: Pruning for airflow, removing infected parts",
            "Organic: Neem oil, copper fungicides, sulfur dusts",
            "Biological: Trichoderma-based products, Bacillus subtilis",
            "Chemical: Appropriate fungicides based on specific pathogen"
          ],
          insights: [
            "Prevention is more effective than treatment for most fungal diseases",
            "Many fungi become resistant to fungicides over time",
            "Application timing is critical - apply before disease pressure is high",
            "Integrated approaches combining multiple strategies are most effective"
          ]
        };
      }
    }
    
    return undefined;
  };

  const getAssistantResponse = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase();
    
    if (normalizedInput.includes('tomato') && (normalizedInput.includes('disease') || normalizedInput.includes('spot'))) {
      return "Based on your description, your tomato plants are likely affected by Early Blight (Alternaria solani). This fungal disease thrives in warm, humid conditions and can spread quickly throughout your crop.\n\nI've prepared a comprehensive analysis including symptoms, causes, preventive measures, and treatment options. You'll find multiple approaches including organic, conventional, and cultural methods to address this issue effectively.";
    }
    
    if (normalizedInput.includes('yellow') && normalizedInput.includes('leaf')) {
      return "Yellow leaves can indicate several issues depending on the pattern and progression:\n\n1. Nutrient deficiencies: Nitrogen (overall yellowing), iron (yellowing between veins), or magnesium (yellowing from edges inward)\n\n2. Watering issues: Overwatering causes root oxygen deprivation, while underwatering leads to nutrient uptake problems\n\n3. Pest infestations: Sap-sucking insects like aphids or spider mites\n\n4. Disease: Various viral, bacterial, or fungal pathogens\n\nTo determine the exact cause, consider when the yellowing began, which leaves are affected (older or newer), and any additional symptoms. Each cause requires a different treatment approach.";
    }
    
    if (normalizedInput.includes('prevent') && normalizedInput.includes('fungal')) {
      return "Preventing fungal infections requires a multi-faceted approach across several categories:\n\n1. Environmental management: Provide adequate spacing between plants, ensure good air circulation, and avoid overhead watering\n\n2. Cultural practices: Implement crop rotation, clean tools between use, and remove plant debris\n\n3. Preventive treatments: Apply compost tea, neem oil, or copper-based fungicides before disease appears\n\n4. Resistant varieties: Choose disease-resistant cultivars suited to your growing region\n\n5. Soil health: Maintain balanced soil pH and nutrient levels to support plant immune systems\n\nImplementing these strategies together provides the most comprehensive protection against fungal diseases.";
    }
    
    if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput.includes('hey')) {
      return "Hello there! I'm your plant care assistant, specializing in crop disease identification and management. I can help with:\n\n• Identifying plant diseases from descriptions or images\n• Providing targeted treatment recommendations\n• Suggesting preventive measures for common crop issues\n• Offering growing advice specific to your crops and conditions\n\nFeel free to ask about specific crops, symptoms you're observing, or general best practices for plant health. What can I assist you with today?";
    }
    
    if (normalizedInput.includes('wheat') && normalizedInput.includes('disease')) {
      return "Wheat is susceptible to several major diseases, with rust being particularly damaging. Based on your query, I've analyzed the common wheat rusts (stem, stripe, and leaf rust) caused by Puccinia species.\n\nI've prepared a comprehensive breakdown including distinct symptoms, environmental triggers, multiple prevention strategies, and various treatment options ranging from cultural practices to fungicide applications. Would you like more specific information about any particular aspect?";
    }
    
    if (normalizedInput.includes('rice') && normalizedInput.includes('disease')) {
      return "Rice crops face several significant diseases, with rice blast (Magnaporthe oryzae) being among the most destructive globally. Other common issues include bacterial leaf blight, sheath blight, and tungro virus.\n\nI've prepared information on symptoms, environmental conditions that favor disease development, preventive practices including resistant varieties, and multiple treatment approaches for each condition. Each disease requires specific management strategies for effective control.";
    }
    
    if (normalizedInput.includes('potato') && normalizedInput.includes('disease')) {
      return "Based on your query about potato diseases, I've analyzed late blight (Phytophthora infestans), which remains one of the most devastating potato diseases worldwide.\n\nI've compiled comprehensive information including visual identification markers, environmental triggers, preventive approaches through cultural practices and resistant varieties, and multiple treatment options ranging from organic copper applications to synthetic fungicides. Early detection and preventive measures are crucial for managing this rapidly spreading disease.";
    }
    
    return "I understand you're asking about crop care. To provide you with the most helpful information, could you specify:\n\n• Which crop or plant are you growing?\n• What symptoms or issues are you observing?\n• Your growing conditions (indoor/outdoor, region, recent weather)?\n• Any treatments you've already tried?\n\nWith these details, I can offer multiple targeted solutions based on scientific research and best agricultural practices.";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div id="assistant" className="rounded-xl overflow-hidden border border-border bg-card shadow-sm animate-fade-up max-w-3xl mx-auto">
      <div className="bg-plant-50 dark:bg-plant-900/20 p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-plant-100 dark:bg-plant-800/50 flex items-center justify-center">
            <Bot className="h-4 w-4 text-plant-600 dark:text-plant-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold">PlantCare Assistant</h3>
            <p className="text-xs text-muted-foreground">Ask anything about plant care</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-8">
          <ChevronDown className="h-4 w-4 mr-1" /> Options
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-plant-100 dark:bg-plant-800/50 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-plant-600 dark:text-plant-400" />
              </div>
              <div className="px-4 py-2 rounded-xl bg-muted text-muted-foreground max-w-[80%] text-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-plant-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-plant-400 animate-pulse [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-plant-400 animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about your crops..."
            className="min-h-10 resize-none"
            rows={1}
          />
          <div className="flex gap-2">
            <Button 
              size="icon" 
              className="h-10 w-10 rounded-xl bg-plant-500 hover:bg-plant-600 text-white"
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type MessageProps = {
  message: Message;
};

function Message({ message }: MessageProps) {
  const isAssistant = message.sender === 'assistant';
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={cn(
      "flex gap-2",
      isAssistant ? "justify-start" : "justify-end"
    )}>
      {isAssistant && (
        <div className="h-8 w-8 rounded-full bg-plant-100 dark:bg-plant-800/50 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-plant-600 dark:text-plant-400" />
        </div>
      )}
      
      <div className={cn(
        "px-4 py-2 rounded-xl max-w-[80%] text-sm",
        isAssistant 
          ? "bg-muted text-foreground" 
          : "bg-plant-500 text-white"
      )}>
        {message.content}
        
        {message.structuredResponse && (
          <div className="mt-3 pt-3 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs mb-2 px-2 py-1 h-7"
            >
              {isExpanded ? "Show Less" : "Show Detailed Analysis"}
            </Button>
            
            {isExpanded && (
              <div className="space-y-3 text-xs animate-fade-down animate-duration-200">
                {message.structuredResponse.symptoms && (
                  <div>
                    <h4 className="font-medium text-plant-700 dark:text-plant-300 mb-1">Symptoms:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {message.structuredResponse.symptoms.map((symptom, idx) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {message.structuredResponse.causes && (
                  <div>
                    <h4 className="font-medium text-plant-700 dark:text-plant-300 mb-1">Causes:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {message.structuredResponse.causes.map((cause, idx) => (
                        <li key={idx}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {message.structuredResponse.prevention && (
                  <div>
                    <h4 className="font-medium text-plant-700 dark:text-plant-300 mb-1">Prevention:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {message.structuredResponse.prevention.map((prevention, idx) => (
                        <li key={idx}>{prevention}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {message.structuredResponse.treatments && (
                  <div>
                    <h4 className="font-medium text-plant-700 dark:text-plant-300 mb-1">Treatment Options:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {message.structuredResponse.treatments.map((treatment, idx) => (
                        <li key={idx}>{treatment}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {message.structuredResponse.insights && (
                  <div>
                    <h4 className="font-medium text-plant-700 dark:text-plant-300 mb-1">Expert Insights:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {message.structuredResponse.insights.map((insight, idx) => (
                        <li key={idx}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {!isAssistant && (
        <div className="h-8 w-8 rounded-full bg-plant-500/10 dark:bg-plant-500/20 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="h-4 w-4 text-plant-600 dark:text-plant-400" />
        </div>
      )}
    </div>
  );
}
