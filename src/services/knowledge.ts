
import { supabase } from "@/integrations/supabase/client"
import { KnowledgeItem } from "@/components/ui/KnowledgeCard"

export async function getKnowledgeArticles(): Promise<KnowledgeItem[]> {
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data || data.length === 0) {
    // If no articles exist yet, return mock data
    return getMockKnowledgeArticles()
  }

  return data.map((article: any) => ({
    id: article.id,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    imageSrc: article.image_url,
    imageAlt: article.image_alt,
    slug: article.slug
  }))
}

export async function getKnowledgeArticleBySlug(slug: string): Promise<any> {
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Article not found")
    }
    throw new Error(error.message)
  }

  return data
}

function getMockKnowledgeArticles(): KnowledgeItem[] {
  return [
    {
      id: '1',
      title: 'Understanding Common Tomato Diseases',
      category: 'Disease Guide',
      excerpt: 'Learn about the most common diseases affecting tomato plants, including early blight, late blight, and septoria leaf spot, with detailed identification and treatment information.',
      imageSrc: 'https://images.unsplash.com/photo-1601383835394-c8679d76a254',
      imageAlt: 'Tomato plants',
      slug: 'understanding-tomato-diseases',
    },
    {
      id: '2',
      title: 'Organic Methods for Controlling Aphids',
      category: 'Pest Control',
      excerpt: 'Discover natural and organic methods to control aphid infestations on your crops without resorting to harmful chemical pesticides.',
      imageSrc: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf',
      imageAlt: 'Plant with aphids',
      slug: 'organic-aphid-control',
    },
    {
      id: '3',
      title: 'Best Practices for Crop Rotation',
      category: 'Farming Guide',
      excerpt: 'Explore the benefits of crop rotation and learn how to implement an effective rotation schedule to improve soil health and reduce disease pressure.',
      imageSrc: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
      imageAlt: 'Farm field with different crops',
      slug: 'crop-rotation-best-practices',
    },
  ]
}
