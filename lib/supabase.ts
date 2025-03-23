// Mock Supabase client for compatibility
export const supabase = {
  auth: {
    signInWithPassword: async () => ({ data: null, error: new Error("Supabase is not configured") }),
    signUp: async () => ({ data: null, error: new Error("Supabase is not configured") }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
    updateUser: async () => ({ data: null, error: new Error("Supabase is not configured") }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        data: null,
        error: null,
      }),
      data: null,
      error: null,
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  }),
}

// Mock function for getting URL
export const getURL = () => {
  return "http://localhost:3000"
}

// Mock function for getting service role
export const getServiceRole = () => {
  return null
}

