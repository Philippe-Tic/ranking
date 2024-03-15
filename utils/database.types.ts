
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
      invites: {
        Row: {
          created_at: string
          emitter: string
          id: string
          project_id: string
          project_name: string | null
          status: Database["public"]["Enums"]["invite status"]
          target_user_id: string
        }
        Insert: {
          created_at?: string
          emitter: string
          id?: string
          project_id: string
          project_name?: string | null
          status?: Database["public"]["Enums"]["invite status"]
          target_user_id: string
        }
        Update: {
          created_at?: string
          emitter?: string
          id?: string
          project_id?: string
          project_name?: string | null
          status?: Database["public"]["Enums"]["invite status"]
          target_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_invites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_invites_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_invites_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          image: string | null
          title: string | null
          votes_raw: string[] | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image?: string | null
          title?: string | null
          votes_raw?: string[] | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image?: string | null
          title?: string | null
          votes_raw?: string[] | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          project_id: string
          status: Database["public"]["Enums"]["vote status"]
          user_id: string
          vote: Json[] | null
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          status?: Database["public"]["Enums"]["vote status"]
          user_id: string
          vote?: Json[] | null
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          status?: Database["public"]["Enums"]["vote status"]
          user_id?: string
          vote?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_votes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      users: {
        Row: {
          email: string | null
          full_name: string | null
          global_name: string | null
          id: string | null
          picture: string | null
        }
        Insert: {
          email?: never
          full_name?: never
          global_name?: never
          id?: string | null
          picture?: never
        }
        Update: {
          email?: never
          full_name?: never
          global_name?: never
          id?: string | null
          picture?: never
        }
        Relationships: []
      }
    }
    Functions: {
      search_user: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      "invite status": "pending" | "accepted" | "rejected"
      "vote status": "todo" | "doing" | "done"
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
