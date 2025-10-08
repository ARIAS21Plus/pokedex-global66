export const ENDPOINTS = {
  pokemon: {
    list: (limit = 20, offset = 0) => `/v2/pokemon?limit=${limit}&offset=${offset}`,
    detail: (name: string) => `/v2/pokemon/${name}`,
  },
} as const
