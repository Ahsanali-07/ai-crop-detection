
import React from 'react';
import { AlertCircle, Check, Info, Leaf, ThumbsUp, ArrowRight, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export type Disease = {
  id: string;
  name: string;
  confidence: number;
  description: string;
  treatment: string[];
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
};

type ResultCardProps = {
  disease: Disease;
};

export default function ResultCard({ disease }: ResultCardProps) {
  // Convert confidence to a percentage string
  const confidencePercent = `${Math.round(disease.confidence * 100)}%`;
  
  // Determine the confidence level color
  const getConfidenceColor = () => {
    if (disease.confidence >= 0.8) return 'text-green-600';
    if (disease.confidence >= 0.6) return 'text-amber-600';
    return 'text-red-600';
  };
  
  // Determine the severity badge style
  const getSeverityBadge = () => {
    switch (disease.severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card animate-fade-up">
      <div className="bg-plant-50 dark:bg-plant-900/20 p-5 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-plant-100 dark:bg-plant-800/50 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-plant-600 dark:text-plant-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Disease Detected</p>
              <h3 className="text-lg font-semibold">{disease.name}</h3>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <p className={cn("text-sm font-bold", getConfidenceColor())}>
                {confidencePercent}
              </p>
            </div>
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full mt-1",
              getSeverityBadge()
            )}>
              {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Severity
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{disease.description}</p>
      </div>
      
      <div className="p-5">
        <div className="mb-5">
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Treatment Steps
          </h4>
          <ul className="space-y-2">
            {disease.treatment.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-plant-100 dark:bg-plant-800/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-plant-800 dark:text-plant-300">{index + 1}</span>
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            Prevention
          </h4>
          <ul className="space-y-2">
            {disease.prevention.map((tip, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <p>Need more help with this disease?</p>
          </div>
          <Button className="bg-plant-500 hover:bg-plant-600 text-white">
            View Detailed Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
