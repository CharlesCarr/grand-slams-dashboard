export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      atp_players: {
        Row: {
          id: string
          nationality: string | null
          player_name: string | null
        }
        Insert: {
          id?: string
          nationality?: string | null
          player_name?: string | null
        }
        Update: {
          id?: string
          nationality?: string | null
          player_name?: string | null
        }
        Relationships: []
      }
      grand_slam_mens: {
        Row: {
          champion: string
          champion_id: string | null
          ctry_champion: string | null
          ctry_runner_up: string | null
          id: string
          major_number: number | null
          runner_up: string | null
          runner_up_id: string | null
          score_in_final: string | null
          seed_champion: number | null
          seed_runner_up: number | null
          year: number | null
        }
        Insert: {
          champion: string
          champion_id?: string | null
          ctry_champion?: string | null
          ctry_runner_up?: string | null
          id?: string
          major_number?: number | null
          runner_up?: string | null
          runner_up_id?: string | null
          score_in_final?: string | null
          seed_champion?: number | null
          seed_runner_up?: number | null
          year?: number | null
        }
        Update: {
          champion?: string
          champion_id?: string | null
          ctry_champion?: string | null
          ctry_runner_up?: string | null
          id?: string
          major_number?: number | null
          runner_up?: string | null
          runner_up_id?: string | null
          score_in_final?: string | null
          seed_champion?: number | null
          seed_runner_up?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grand_slam_mens_champion_id_fkey"
            columns: ["champion_id"]
            referencedRelation: "atp_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grand_slam_mens_runner_up_id_fkey"
            columns: ["runner_up_id"]
            referencedRelation: "atp_players"
            referencedColumns: ["id"]
          }
        ]
      }
      grand_slam_womens: {
        Row: {
          champion: string | null
          champion_id: string | null
          ctry_champion: string | null
          ctry_runner_up: string | null
          id: string
          major_number: number | null
          runner_up: string | null
          runner_up_id: string | null
          score_in_final: string | null
          seed_champion: number | null
          seed_runner_up: number | null
          year: number | null
        }
        Insert: {
          champion?: string | null
          champion_id?: string | null
          ctry_champion?: string | null
          ctry_runner_up?: string | null
          id?: string
          major_number?: number | null
          runner_up?: string | null
          runner_up_id?: string | null
          score_in_final?: string | null
          seed_champion?: number | null
          seed_runner_up?: number | null
          year?: number | null
        }
        Update: {
          champion?: string | null
          champion_id?: string | null
          ctry_champion?: string | null
          ctry_runner_up?: string | null
          id?: string
          major_number?: number | null
          runner_up?: string | null
          runner_up_id?: string | null
          score_in_final?: string | null
          seed_champion?: number | null
          seed_runner_up?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grand_slam_womens_champion_id_fkey"
            columns: ["champion_id"]
            referencedRelation: "wta_players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grand_slam_womens_runner_up_id_fkey"
            columns: ["runner_up_id"]
            referencedRelation: "wta_players"
            referencedColumns: ["id"]
          }
        ]
      }
      views: {
        Row: {
          count: number | null
          created_at: string | null
          id: string
          slug: string | null
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          id?: string
          slug?: string | null
        }
        Update: {
          count?: number | null
          created_at?: string | null
          id?: string
          slug?: string | null
        }
        Relationships: []
      }
      wta_players: {
        Row: {
          id: string
          nationality: string | null
          player_name: string | null
        }
        Insert: {
          id?: string
          nationality?: string | null
          player_name?: string | null
        }
        Update: {
          id?: string
          nationality?: string | null
          player_name?: string | null
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

export type TableType<TableName extends keyof Database['public']['Tables']> = Database['public']['Tables'][TableName]['Row'];
