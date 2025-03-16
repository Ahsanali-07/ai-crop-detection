export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      crop_distribution: {
        Row: {
          id: string
          name: string
          value: number
        }
        Insert: {
          id?: string
          name: string
          value: number
        }
        Update: {
          id?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
      disease_trends: {
        Row: {
          early_blight: number
          id: string
          late_blight: number
          month: string
          powdery_mildew: number
        }
        Insert: {
          early_blight: number
          id?: string
          late_blight: number
          month: string
          powdery_mildew: number
        }
        Update: {
          early_blight?: number
          id?: string
          late_blight?: number
          month?: string
          powdery_mildew?: number
        }
        Relationships: []
      }
      knowledge_articles: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_alt: string | null
          image_url: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_history: {
        Row: {
          created_at: string
          id: string
          message: string
          response: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          response: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          response?: string
          user_id?: string | null
        }
        Relationships: []
      }
      plant_detections: {
        Row: {
          confidence: number | null
          created_at: string
          description: string | null
          disease_name: string | null
          id: string
          image_url: string | null
          plant_type: string
          prevention: string[] | null
          severity: string | null
          treatment: string[] | null
          user_id: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          description?: string | null
          disease_name?: string | null
          id?: string
          image_url?: string | null
          plant_type: string
          prevention?: string[] | null
          severity?: string | null
          treatment?: string[] | null
          user_id?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string
          description?: string | null
          disease_name?: string | null
          id?: string
          image_url?: string | null
          plant_type?: string
          prevention?: string[] | null
          severity?: string | null
          treatment?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      treatment_effectiveness: {
        Row: {
          effectiveness: number
          id: string
          treatment: string
        }
        Insert: {
          effectiveness: number
          id?: string
          treatment: string
        }
        Update: {
          effectiveness?: number
          id?: string
          treatment?: string
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          condition: string | null
          created_at: string
          humidity: number
          id: string
          location: string | null
          temperature: number
          timestamp: string
        }
        Insert: {
          condition?: string | null
          created_at?: string
          humidity: number
          id?: string
          location?: string | null
          temperature: number
          timestamp?: string
        }
        Update: {
          condition?: string | null
          created_at?: string
          humidity?: number
          id?: string
          location?: string | null
          temperature?: number
          timestamp?: string
        }
        Relationships: []
      }
      weather_impacts: {
        Row: {
          date: string
          disease_index: number
          humidity: number
          id: string
          temperature: number
        }
        Insert: {
          date: string
          disease_index: number
          humidity: number
          id?: string
          temperature: number
        }
        Update: {
          date?: string
          disease_index?: number
          humidity?: number
          id?: string
          temperature?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
