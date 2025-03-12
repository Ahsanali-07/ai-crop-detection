
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Bot, Leaf, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const VoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [supportsSpeechRecognition, setSupportsSpeechRecognition] = useState(true);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupportsSpeechRecognition(false);
    }
  }, []);

  const startListening = () => {
    setTranscript('');
    setResponse('');
    setIsListening(true);
    setShowSavePrompt(false);
    
    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupportsSpeechRecognition(false);
      return;
    }
    
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      console.log('Voice recognition started');
    };
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      processVoiceInput(transcript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast({
        title: "Recognition Error",
        description: "We couldn't hear you clearly. Please try again.",
        variant: "destructive"
      });
    };
    
    recognition.start();
  };
  
  const processVoiceInput = (input: string) => {
    if (!input.trim()) return;
    
    setIsResponding(true);
    
    // Enhanced command detection
    const lowerInput = input.toLowerCase();
    
    // Handle navigation commands
    if (lowerInput.includes('go to') || lowerInput.includes('open') || lowerInput.includes('show')) {
      if (lowerInput.includes('dashboard')) {
        setTimeout(() => {
          setIsResponding(false);
          setResponse("Navigating to dashboard...");
          setTimeout(() => navigate('/dashboard'), 1500);
        }, 1000);
        return;
      } else if (lowerInput.includes('history') || lowerInput.includes('saved')) {
        setTimeout(() => {
          setIsResponding(false);
          setResponse("Opening your saved history...");
          setTimeout(() => navigate('/dashboard?tab=history'), 1500);
        }, 1000);
        return;
      } else if (lowerInput.includes('insights') || lowerInput.includes('analytics')) {
        setTimeout(() => {
          setIsResponding(false);
          setResponse("Navigating to insights page...");
          setTimeout(() => navigate('/insights'), 1500);
        }, 1000);
        return;
      } else if (lowerInput.includes('knowledge')) {
        setTimeout(() => {
          setIsResponding(false);
          setResponse("Opening knowledge base...");
          setTimeout(() => navigate('/knowledge'), 1500);
        }, 1000);
        return;
      }
    }
    
    // Handle analysis command
    if (lowerInput.includes('analyze') || lowerInput.includes('scan')) {
      setTimeout(() => {
        setIsResponding(false);
        setResponse("To analyze your crop, please upload an image using the scan tool on the homepage.");
      }, 1500);
      return;
    }
    
    // Generate response based on keywords for crop diseases and treatments
    setTimeout(() => {
      let aiResponse = '';
      
      if (lowerInput.includes('tomato') && (lowerInput.includes('disease') || lowerInput.includes('blight'))) {
        aiResponse = "I've detected you're asking about tomato diseases, possibly early blight. Early blight is characterized by dark spots with concentric rings. For treatment, remove affected leaves, apply a fungicide, and ensure proper spacing between plants. Preventive measures include crop rotation, resistant varieties, and avoiding overhead watering.";
        setShowSavePrompt(true);
      } 
      else if (lowerInput.includes('potato') && lowerInput.includes('disease')) {
        aiResponse = "For potato diseases, late blight is the most concerning. It appears as dark, water-soaked spots that quickly enlarge. Apply copper-based fungicides preventively, remove infected plants, and maintain good airflow between plants. Consider resistant varieties for future plantings.";
        setShowSavePrompt(true);
      }
      else if (lowerInput.includes('wheat') && lowerInput.includes('disease')) {
        aiResponse = "Common wheat diseases include rust, smut, and powdery mildew. Rust appears as orange-brown pustules on leaves and stems. Fungicide applications at the right growth stage are crucial. Crop rotation and resistant varieties are effective preventive measures. Would you like more specific information about a particular wheat disease?";
        setShowSavePrompt(true);
      }
      else if (lowerInput.includes('rice') && lowerInput.includes('disease')) {
        aiResponse = "Rice is susceptible to blast, bacterial leaf blight, and sheath blight. Rice blast causes diamond-shaped lesions on leaves and can affect all above-ground parts of the plant. Maintaining proper water management and using resistant varieties are key control strategies. Fungicides containing tricyclazole or probenazole can be effective against blast.";
        setShowSavePrompt(true);
      }
      else if (lowerInput.includes('weather') || lowerInput.includes('temperature') || lowerInput.includes('condition')) {
        aiResponse = "Optimal growing conditions depend on the crop. Tomatoes prefer 18-29°C with 65-75% humidity, while potatoes thrive in 15-20°C. Wheat grows best in cool, dry conditions around 15-18°C during growing season. Rice needs warm temperatures between 20-35°C and high humidity. Most crops benefit from consistent moisture but not waterlogged conditions. Would you like specific weather recommendations for a particular crop?";
      }
      else if (lowerInput.includes('treatment') || lowerInput.includes('fungicide')) {
        aiResponse = "When applying treatments, always follow label instructions. Organic options include copper-based fungicides, neem oil, and sulfur dust. For systemic fungal infections, consider products containing propiconazole or azoxystrobin. Apply early when symptoms first appear and reapply after rain. Remember that prevention through good cultural practices is the most effective approach.";
      }
      else if (lowerInput.includes('fungal') && lowerInput.includes('infection')) {
        aiResponse = "For fungal infections, I recommend a combination of cultural and chemical controls. First, improve air circulation by proper spacing and pruning. Apply copper-based fungicides as a preventative measure, or use systemic fungicides containing propiconazole for established infections. Organic options include neem oil, compost tea, and Bacillus subtilis-based products. Would you like specific recommendations for a particular crop?";
        setShowSavePrompt(true);
      }
      else if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
        aiResponse = "I can help you with crop disease identification, treatment recommendations, and growing advice. You can ask me about specific crops like tomatoes, potatoes, wheat, or rice. You can also use voice commands like 'Go to dashboard', 'Open insights', 'Show history', or 'Analyze my crop'. How can I assist you today?";
      }
      else {
        aiResponse = "I understand you're asking about crop care. Could you provide more specific details about the crop type, symptoms you're seeing, or the kind of advice you need? For example, you can ask about tomato blight, optimal weather conditions for wheat, or treatment options for fungal diseases.";
      }
      
      setResponse(aiResponse);
      setIsResponding(false);
    }, 2000);
  };

  const handleSaveResult = () => {
    // Simulate saving to history
    toast({
      title: "Analysis Saved",
      description: "This analysis has been saved to your history.",
      variant: "default"
    });
    setShowSavePrompt(false);
  };

  const dismissSavePrompt = () => {
    setShowSavePrompt(false);
  };

  if (!supportsSpeechRecognition) {
    return (
      <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800/30 text-orange-800 dark:text-orange-300">
        <AlertTitle className="flex items-center">
          <MicOff className="h-4 w-4 mr-2" />
          Voice Recognition Not Supported
        </AlertTitle>
        <AlertDescription>
          Your browser doesn't support voice recognition. Please try using a modern browser like Chrome, Edge, or Safari.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-plant-50 dark:bg-plant-900/20 border-b border-border">
        <CardTitle className="flex items-center text-lg">
          <Leaf className="h-5 w-5 mr-2 text-plant-600" />
          Voice Assistant
        </CardTitle>
        <CardDescription>
          Ask about crop diseases, treatments, or issue voice commands
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {transcript && (
            <div className="rounded-xl bg-muted p-4 animate-fade-up">
              <p className="text-sm font-medium mb-1">You said:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
          
          {response && (
            <div className="rounded-xl bg-plant-50 dark:bg-plant-900/20 p-4 border border-plant-100 dark:border-plant-800/30 animate-fade-up">
              <div className="flex items-center mb-2">
                <Bot className="h-5 w-5 mr-2 text-plant-600" />
                <p className="text-sm font-medium">PlantCare Assistant:</p>
              </div>
              <p className="text-sm">{response}</p>
            </div>
          )}
          
          {showSavePrompt && (
            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800/30 animate-fade-up">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Do you want to save this result to history?</p>
                <Button variant="ghost" size="sm" onClick={dismissSavePrompt}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Button 
                  size="sm" 
                  className="bg-plant-500 hover:bg-plant-600 text-white"
                  onClick={handleSaveResult}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Yes, Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={dismissSavePrompt}
                >
                  No, Thanks
                </Button>
              </div>
            </div>
          )}
          
          {isResponding && (
            <div className="rounded-xl bg-plant-50 dark:bg-plant-900/20 p-4 border border-plant-100 dark:border-plant-800/30 animate-fade-up">
              <div className="flex items-center mb-2">
                <Bot className="h-5 w-5 mr-2 text-plant-600" />
                <p className="text-sm font-medium">PlantCare Assistant is thinking...</p>
              </div>
              <div className="flex space-x-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-plant-500 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-plant-500 animate-pulse delay-150"></div>
                <div className="h-2 w-2 rounded-full bg-plant-500 animate-pulse delay-300"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center p-4 border-t border-border bg-muted/30">
        <Button
          onClick={startListening}
          disabled={isListening || isResponding}
          className={cn(
            "rounded-full h-16 w-16 flex items-center justify-center transition-all duration-300",
            isListening
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
              : "bg-plant-500 hover:bg-plant-600 text-white"
          )}
        >
          {isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceRecognition;
