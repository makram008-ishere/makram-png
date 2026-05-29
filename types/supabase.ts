export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          created_at: string | null;
          tags: string[];
          cover_image: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          created_at?: string | null;
          tags?: string[];
          cover_image?: string | null;
        };
        Update: {
          title?: string;
          content?: string;
          created_at?: string | null;
          tags?: string[];
          cover_image?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string | null;
          github_link: string | null;
          live_link: string | null;
          tags: string[];
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url?: string | null;
          github_link?: string | null;
          live_link?: string | null;
          tags?: string[];
        };
        Update: {
          title?: string;
          description?: string;
          image_url?: string | null;
          github_link?: string | null;
          live_link?: string | null;
          tags?: string[];
        };
      };
      designs: {
        Row: {
          id: string;
          title: string;
          image_url: string | null;
          description: string;
          tags: string[];
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          image_url?: string | null;
          description: string;
          tags?: string[];
          created_at?: string | null;
        };
        Update: {
          title?: string;
          image_url?: string | null;
          description?: string;
          tags?: string[];
          created_at?: string | null;
        };
      };
    };
  };
}
