import { supabase } from "@/integrations/supabase/client"
import { Disease } from "@/components/ui/ResultCard"
import { uploadImage } from "./storage"

// Generate a random disease result for each upload
export async function detectDisease(image: File): Promise<Disease> {
  // List of possible diseases with their details
  const possibleDiseases = [
    {
      id: "tomato-early-blight",
      name: "Tomato Early Blight",
      confidence: 0.88 + Math.random() * 0.1, // Random confidence between 0.88-0.98
      description: "Early blight is a common fungal disease that affects tomato plants. It is characterized by dark spots with concentric rings and yellowing around the spots.",
      treatment: [
        "Remove and destroy all affected leaves to prevent spread.",
        "Apply a fungicide specifically labeled for early blight control.",
        "Ensure proper spacing between plants to improve air circulation.",
        "Water at the base of plants to keep foliage dry.",
      ],
      prevention: [
        "Use disease-resistant varieties when possible.",
        "Practice crop rotation, avoiding planting tomatoes in the same area for 3-4 years.",
        "Provide adequate spacing between plants for good air circulation.",
        "Use mulch to prevent soil splash onto leaves.",
        "Keep garden free of plant debris where fungi can overwinter.",
      ],
      severity: "medium",
    },
    {
      id: "tomato-late-blight",
      name: "Tomato Late Blight",
      confidence: 0.85 + Math.random() * 0.12, // Random confidence between 0.85-0.97
      description: "Late blight is a destructive disease that affects tomatoes and potatoes. It's caused by the oomycete pathogen and can spread rapidly in cool, wet conditions.",
      treatment: [
        "Remove and destroy all infected plant parts immediately.",
        "Apply copper-based fungicides as a preventative measure.",
        "Increase air circulation around plants by proper spacing and pruning.",
        "Avoid overhead watering, especially in the evening.",
      ],
      prevention: [
        "Plant resistant varieties when available.",
        "Use certified disease-free seed and transplants.",
        "Avoid planting in areas with poor drainage.",
        "Rotate crops on a 3-year cycle.",
        "Clean up all garden debris at the end of the season.",
      ],
      severity: "high",
    },
    {
      id: "cucumber-powdery-mildew",
      name: "Cucumber Powdery Mildew",
      confidence: 0.89 + Math.random() * 0.09, // Random confidence between 0.89-0.98
      description: "Powdery mildew is a fungal disease that appears as a white powdery substance on leaves. It commonly affects cucumbers and other cucurbits, reducing yield and fruit quality.",
      treatment: [
        "Apply potassium bicarbonate, neem oil, or sulfur-based fungicides.",
        "Remove severely infected leaves to slow spread.",
        "Improve air circulation by thinning plants and removing crowded foliage.",
        "Avoid overhead watering that can increase humidity.",
      ],
      prevention: [
        "Select resistant varieties when possible.",
        "Provide adequate spacing for good air circulation.",
        "Avoid excessive nitrogen fertilization which promotes susceptible new growth.",
        "Water at the base of plants in the morning.",
        "Practice crop rotation.",
      ],
      severity: "low",
    },
    {
      id: "pepper-bacterial-spot",
      name: "Pepper Bacterial Spot",
      confidence: 0.82 + Math.random() * 0.12, // Random confidence between 0.82-0.94
      description: "Bacterial spot causes small, circular to irregular, dark lesions on leaves, stems, and fruits of peppers. Severe infections can cause defoliation and significant yield loss.",
      treatment: [
        "Apply copper-based bactericides at first sign of disease.",
        "Remove infected plant debris from the field.",
        "Avoid working with plants when they're wet.",
        "Maintain proper plant spacing for good air circulation.",
      ],
      prevention: [
        "Use disease-free seeds and transplants.",
        "Practice crop rotation for at least 2 years.",
        "Avoid overhead irrigation to reduce leaf wetness.",
        "Clean tools and equipment between use.",
        "Choose resistant varieties when available.",
      ],
      severity: "medium",
    }
  ];

  // Randomly select one of the diseases
  const randomDisease = possibleDiseases[Math.floor(Math.random() * possibleDiseases.length)];
  
  // Generate a random severity if desired
  const severities = ["low", "medium", "high"] as const;
  if (Math.random() > 0.5) {
    randomDisease.severity = severities[Math.floor(Math.random() * severities.length)];
  }

  // Upload the image to Supabase Storage
  const imageUrl = await uploadImage(image);

  // Save the detection results to the database
  try {
    const { data, error } = await supabase
      .from("plant_detections")
      .insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        plant_type: randomDisease.name.split(" ")[0], // Extract plant type from disease name
        disease_name: randomDisease.name,
        confidence: randomDisease.confidence,
        image_url: imageUrl,
        description: randomDisease.description,
        treatment: randomDisease.treatment,
        prevention: randomDisease.prevention,
        severity: randomDisease.severity
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...randomDisease,
      id: data.id
    };
  } catch (error) {
    console.error("Error saving detection:", error);
    // Still return the random disease even if saving fails
    return randomDisease;
  }
}

// Keep the getUserDetections function as is
export async function getUserDetections(): Promise<any[]> {
  const { data, error } = await supabase
    .from("plant_detections")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}
