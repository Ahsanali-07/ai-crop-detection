
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Bot, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const VoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [supportsSpeechRecognition, setSupportsSpeechRecognition] = useState(true);
  const { toast } = useToast();

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
    
    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      console.log('Voice recognition started');
    };
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      processVoiceInput(transcript);
    };
    
    recognition.onerror = (event) => {
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
  
  const processVoiceInput = (input) => {
    if (!input.trim()) return;
    
    setIsResponding(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      
      // Generate response based on keywords
      let aiResponse = '';
      
      if (lowerInput.includes('tomato') && (lowerInput.includes('disease') || lowerInput.includes('blight'))) {
        aiResponse = "I've detected you're asking about tomato diseases, possibly early blight. Early blight is characterized by dark spots with concentric rings. For treatment, remove affected leaves, apply a fungicide, and ensure proper spacing between plants. Preventive measures include crop rotation, resistant varieties, and avoiding overhead watering.";
      } 
      else if (lowerInput.includes('potato') && lowerInput.includes('disease')) {
        aiResponse = "For potato diseases, late blight is the most concerning. It appears as dark, water-soaked spots that quickly enlarge. Apply copper-based fungicides preventively, remove infected plants, and maintain good airflow between plants. Consider resistant varieties for future plantings.";
      }
      else if (lowerInput.includes('weather') || lowerInput.includes('temperature')) {
        aiResponse = "Optimal growing conditions depend on the crop. Tomatoes prefer 18-29°C with 65-75% humidity, while potatoes thrive in 15-20°C. Most crops benefit from consistent moisture but not waterlogged conditions. Would you like specific weather recommendations for a particular crop?";
      }
      else if (lowerInput.includes('treatment') || lowerInput.includes('fungicide')) {
        aiResponse = "When applying treatments, always follow label instructions. Organic options include copper-based fungicides, neem oil, and sulfur dust. For best results, apply early when symptoms first appear and reapply after rain. Remember that prevention through good cultural practices is the most effective approach.";
      }
      else {
        aiResponse = "I understand you're asking about crop care. Could you provide more specific details about the crop type, symptoms you're seeing, or the kind of advice you need? This helps me give you the most relevant guidance.";
      }
      
      setResponse(aiResponse);
      setIsResponding(false);
    }, 2000);
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
          Ask about crop diseases, treatments, or growing conditions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {transcript && (
            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm font-medium mb-1">You said:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
          
          {response && (
            <div className="rounded-xl bg-plant-50 dark:bg-plant-900/20 p-4 border border-plant-100 dark:border-plant-800/30">
              <div className="flex items-center mb-2">
                <Bot className="h-5 w-5 mr-2 text-plant-600" />
                <p className="text-sm font-medium">PlantCare Assistant:</p>
              </div>
              <p className="text-sm">{response}</p>
            </div>
          )}
          
          {isResponding && (
            <div className="rounded-xl bg-plant-50 dark:bg-plant-900/20 p-4 border border-plant-100 dark:border-plant-800/30">
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
