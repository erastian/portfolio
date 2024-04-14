export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      skills: {
        Row: {
          id: number
          created_at: string
          tech: string
          icon: string
          description: string
          level: number
          experience: number
          order: number
          isPublished: boolean
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          name: string       // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {            // the data to be passed to .update()
          id?: never
          name?: string      // `not null` columns are optional on .update()
          data?: Json | null
        }
      },
      projects: {
        Row: {
          id: number,
          created_at: string,
          title: string,
          description: string,
          prj_stack: string,
          responsibilities: string,
          goal: string,
          images: string[],
          order: number
          isPublished: boolean
        }
      }
    }
  }
}