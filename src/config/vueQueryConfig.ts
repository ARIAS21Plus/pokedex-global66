import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
})
const vueQueryOptions: VueQueryPluginOptions = { queryClient }

export { VueQueryPlugin, vueQueryOptions }
