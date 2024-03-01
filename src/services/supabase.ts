import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zvwyaoedhsrbfwycadck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2d3lhb2VkaHNyYmZ3eWNhZGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5Nzk3NjUsImV4cCI6MjAyMDU1NTc2NX0.KiSFaXXCyO6V6_JP_XRmtXs-yjBmaH9pDRXErtxSmZQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string;
          difficulty: string;
          equipment: string;
          id: number;
          instructions: string;
          muscle: string;
          name: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          difficulty?: string;
          equipment?: string;
          id?: number;
          instructions?: string;
          muscle?: string;
          name?: string;
          type?: string;
        };
        Update: {
          created_at?: string;
          difficulty?: string;
          equipment?: string;
          id?: number;
          instructions?: string;
          muscle?: string;
          name?: string;
          type?: string;
        };
        Relationships: [];
      };
      measures: {
        Row: {
          body_fat_percentage: Json[] | null;
          caloric_intake: Json[] | null;
          chest: Json[] | null;
          created_at: string;
          height: Json[] | null;
          hips: Json[] | null;
          id: number;
          left_bicep: Json[] | null;
          left_thigh: Json[] | null;
          neck: Json[] | null;
          right_bicep: Json[] | null;
          right_thigh: Json[] | null;
          shoulders: Json[] | null;
          user_id: string | null;
          waist: Json[] | null;
          weight: Json[] | null;
        };
        Insert: {
          body_fat_percentage?: Json[] | null;
          caloric_intake?: Json[] | null;
          chest?: Json[] | null;
          created_at?: string;
          height?: Json[] | null;
          hips?: Json[] | null;
          id?: number;
          left_bicep?: Json[] | null;
          left_thigh?: Json[] | null;
          neck?: Json[] | null;
          right_bicep?: Json[] | null;
          right_thigh?: Json[] | null;
          shoulders?: Json[] | null;
          user_id?: string | null;
          waist?: Json[] | null;
          weight?: Json[] | null;
        };
        Update: {
          body_fat_percentage?: Json[] | null;
          caloric_intake?: Json[] | null;
          chest?: Json[] | null;
          created_at?: string;
          height?: Json[] | null;
          hips?: Json[] | null;
          id?: number;
          left_bicep?: Json[] | null;
          left_thigh?: Json[] | null;
          neck?: Json[] | null;
          right_bicep?: Json[] | null;
          right_thigh?: Json[] | null;
          shoulders?: Json[] | null;
          user_id?: string | null;
          waist?: Json[] | null;
          weight?: Json[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "measures_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      settings: {
        Row: {
          created_at: string;
          distance: string | null;
          first_day: string | null;
          id: number;
          size: string | null;
          sound: string | null;
          sound_effect: boolean | null;
          timer_value: number | null;
          user_id: string | null;
          weight: string | null;
        };
        Insert: {
          created_at?: string;
          distance?: string | null;
          first_day?: string | null;
          id?: number;
          size?: string | null;
          sound?: string | null;
          sound_effect?: boolean | null;
          timer_value?: number | null;
          user_id?: string | null;
          weight?: string | null;
        };
        Update: {
          created_at?: string;
          distance?: string | null;
          first_day?: string | null;
          id?: number;
          size?: string | null;
          sound?: string | null;
          sound_effect?: boolean | null;
          timer_value?: number | null;
          user_id?: string | null;
          weight?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      templates: {
        Row: {
          created_at: string;
          exercises: Json[] | null;
          id: string;
          last_performed: string | null;
          name: string | null;
          note: string | null;
          superSets: Json[] | null;
          type: string | null;
          unit: string | null;
        };
        Insert: {
          created_at?: string;
          exercises?: Json[] | null;
          id: string;
          last_performed?: string | null;
          name?: string | null;
          note?: string | null;
          superSets?: Json[] | null;
          type?: string | null;
          unit?: string | null;
        };
        Update: {
          created_at?: string;
          exercises?: Json[] | null;
          id?: string;
          last_performed?: string | null;
          name?: string | null;
          note?: string | null;
          superSets?: Json[] | null;
          type?: string | null;
          unit?: string | null;
        };
        Relationships: [];
      };
      user_exercises: {
        Row: {
          created_at: string;
          exercise_id: number | null;
          id: number;
          name: string | null;
          note: Json | null;
          sets: Json[] | null;
          time: Json | null;
          uniqueId: string | null;
          unit: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          exercise_id?: number | null;
          id?: number;
          name?: string | null;
          note?: Json | null;
          sets?: Json[] | null;
          time?: Json | null;
          uniqueId?: string | null;
          unit?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          exercise_id?: number | null;
          id?: number;
          name?: string | null;
          note?: Json | null;
          sets?: Json[] | null;
          time?: Json | null;
          uniqueId?: string | null;
          unit?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_exercises_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_exercises_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      Workouts: {
        Row: {
          created_at: string;
          end_time: string | null;
          exercises: Json[] | null;
          id: number;
          name: string | null;
          note: string | null;
          start_time: string | null;
          superSets: Json[] | null;
          unit: string | null;
          user_id: string | null;
          workout_time: string | null;
        };
        Insert: {
          created_at?: string;
          end_time?: string | null;
          exercises?: Json[] | null;
          id?: number;
          name?: string | null;
          note?: string | null;
          start_time?: string | null;
          superSets?: Json[] | null;
          unit?: string | null;
          user_id?: string | null;
          workout_time?: string | null;
        };
        Update: {
          created_at?: string;
          end_time?: string | null;
          exercises?: Json[] | null;
          id?: number;
          name?: string | null;
          note?: string | null;
          start_time?: string | null;
          superSets?: Json[] | null;
          unit?: string | null;
          user_id?: string | null;
          workout_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Workouts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
