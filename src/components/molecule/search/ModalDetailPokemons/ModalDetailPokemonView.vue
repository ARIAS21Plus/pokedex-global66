<script setup lang="ts">
import { Teleport } from 'vue'
import Button from '@/components/atoms/Button.vue'
import IconCloseCircle from '@/components/atoms/icons/IconCloseCircle.vue'
import IconStar from '@/components/atoms/icons/IconStar.vue'

const props = defineProps<{
  pokemon: {
    name: string
    types: string
    weight: number
    height: number
    image: string
  }
  isOpen: boolean
  isFavorite: boolean
  isCopied: boolean
  onClose: () => void
  onShare: () => void
  onToggleFavorite: () => void
}>()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-5 py-5"
      v-if="props.isOpen"
      @click="props.onClose"
    >
      <div
        class="bg-white rounded w-full max-w-[570px] overflow-hidden relative"
        data-testid="modal-detail"
        @click.stop
      >
        <button
          data-testid="close-modal"
          class="absolute top-3 right-3 text-white cursor-pointer z-10"
          @click="props.onClose"
        >
          <IconCloseCircle class="size-6" />
        </button>
        <div class="w-full h-[220px] mb-2 relative">
          <img
            :src="props.pokemon.image"
            :alt="props.pokemon.name"
            class="h-full aspect-square object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5"
          />
          <img
            src="/public/02cb4f0c74350c22de079273f99765e71abb0f53.png"
            alt="Pokemon background"
            class="w-full h-full object-cover"
          />
        </div>
        <ul
          class="text-secondary text-lg font-bold px-8 [&>li]:py-2.5 [&>li]:border-b [&>li]:border-gray-200 [&>li>span]:font-normal"
        >
          <li>
            Name: <span>{{ props.pokemon.name }}</span>
          </li>
          <li>
            Weight: <span>{{ props.pokemon.weight }}</span>
          </li>
          <li>
            Height: <span>{{ props.pokemon.height }}</span>
          </li>
          <li>
            Types: <span>{{ props.pokemon.types }}</span>
          </li>
        </ul>

        <div class="flex justify-between px-8 py-5">
          <Button variant="primary" rounded="full" @click="props.onShare">
            {{ props.isCopied ? 'Copied' : 'Share to my friends' }}
          </Button>
          <Button
            size="icon"
            :class="props.isFavorite ? 'text-accent!' : ''"
            @click="props.onToggleFavorite"
          >
            <IconStar />
          </Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
