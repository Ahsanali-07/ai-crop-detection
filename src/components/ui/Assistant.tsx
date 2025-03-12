
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
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(input),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAssistantResponse = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase();
    
    if (normalizedInput.includes('tomato') && (normalizedInput.includes('disease') || normalizedInput.includes('spot'))) {
      return "Based on your description, your tomato plants might be suffering from Early Blight. This is characterized by dark spots with concentric rings. To treat it, remove affected leaves, ensure proper plant spacing for airflow, and consider applying an organic fungicide. Watering at the base of the plant rather than the leaves can also help prevent fungal diseases.";
    }
    
    if (normalizedInput.includes('yellow') && normalizedInput.includes('leaf')) {
      return "Yellow leaves can indicate several issues: nutrient deficiency (particularly nitrogen), overwatering, or underwatering. Check your soil moisture and consider testing your soil nutrients. For an immediate step, ensure your watering schedule is consistent and that the plants have proper drainage.";
    }
    
    if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput.includes('hey')) {
      return "Hello there! I'm your friendly plant care assistant. I can help you identify plant diseases, provide treatment recommendations, or offer general gardening advice. What would you like to know about today?";
    }
    
    return "I understand you're asking about your crops. To give you the most accurate advice, could you provide more specific details about what you're observing? Including information about the plant type, symptoms, and perhaps uploading an image would help me assist you better.";
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
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-5 w-5" />
            </Button>
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
      </div>
      
      {!isAssistant && (
        <div className="h-8 w-8 rounded-full bg-plant-500/10 dark:bg-plant-500/20 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="h-4 w-4 text-plant-600 dark:text-plant-400" />
        </div>
      )}
    </div>
  );
}
