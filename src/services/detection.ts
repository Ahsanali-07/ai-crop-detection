
import { supabase } from "@/integrations/supabase/client"
import { Disease } from "@/components/ui/ResultCard"
import { uploadImage } from "./storage"

// Mock detection function since we don't have an actual AI detection API
export async function detectDisease(image: File): Promise<Disease> {
  // In a real application, this would call an AI API endpoint
  // For now, we're returning mock data
  const mockDisease: Disease = {
    id: "tomato-early-blight",
    name: "Tomato Early Blight",
    confidence: 0.92,
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
  }

  // Upload the image to Supabase Storage
  const imageUrl = await uploadImage(image)

  // In a real application, you'd send the image to an AI service
  // For now, let's just save the detection results to the database
  try {
    const { data, error } = await supabase
      .from("plant_detections")
      .insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        plant_type: "Tomato",
        disease_name: mockDisease.name,
        confidence: mockDisease.confidence,
        image_url: imageUrl,
        description: mockDisease.description,
        treatment: mockDisease.treatment,
        prevention: mockDisease.prevention,
        severity: mockDisease.severity
      })
      .select()
      .single()

    if (error) throw error

    return {
      ...mockDisease,
      id: data.id
    }
  } catch (error) {
    console.error("Error saving detection:", error)
    // Still return the mock data even if saving fails
    return mockDisease
  }
}

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
