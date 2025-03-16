
import { supabase } from "@/integrations/supabase/client"
import { v4 as uuidv4 } from 'uuid'

const BUCKET_NAME = "plant-images"

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file)

  if (error) {
    throw new Error(error.message)
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return urlData.publicUrl
}

export async function deleteImage(url: string): Promise<void> {
  const path = url.split(`/${BUCKET_NAME}/`)[1]
  
  if (!path) {
    throw new Error("Invalid image URL")
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) {
    throw new Error(error.message)
  }
}
