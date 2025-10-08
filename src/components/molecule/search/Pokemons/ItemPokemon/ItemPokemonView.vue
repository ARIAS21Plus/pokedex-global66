<script setup lang="ts">
import IconStar from '@/components/atoms/icons/IconStar.vue'
import Button from '@/components/atoms/Button.vue'

const props = defineProps<{
  pokemon: {
    url: string
    name: string
  }
  onOpenModalDetailPokemon: (pokemon: { url: string; name: string }) => void
  isFavorite: boolean
  toggleFavorite: () => void
}>()
</script>

<template>
  <div
    class="flex items-center justify-between bg-white rounded py-2 px-3 hover:shadow-md transition-all cursor-pointer"
    @click="props.onOpenModalDetailPokemon(props.pokemon)"
  >
    <div class="flex-1">
      <h3 class="text-xl font-medium">{{ props.pokemon.name }}</h3>
    </div>
    <div class="flex-none">
      <Button
        :class="props.isFavorite ? 'text-accent!' : ''"
        size="icon"
        @click.stop="props.toggleFavorite"
      >
        <IconStar />
      </Button>
    </div>
  </div>
</template>
