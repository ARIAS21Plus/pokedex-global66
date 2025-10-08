import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  enabled: Ref<boolean> | boolean
  rootMargin?: string
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const { onLoadMore, enabled, rootMargin = '200px' } = options

  const targetRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        const isEnabled = typeof enabled === 'boolean' ? enabled : enabled.value

        if (entry?.isIntersecting && isEnabled) {
          onLoadMore()
        }
      },
      { rootMargin },
    )

    observer.observe(targetRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return {
    targetRef,
  }
}
