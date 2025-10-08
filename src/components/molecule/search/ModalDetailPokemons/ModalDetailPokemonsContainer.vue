<script setup lang="ts">
import { computed } from 'vue'
import { useSearchStore } from '@/stores/search.store'
import ModalDetailPokemonView from '@/components/molecule/search/ModalDetailPokemons/ModalDetailPokemonView.vue'
import { useGetPokemonDetail } from '@/composables/useGetPokemonDetail'
import { useFavoritesStore } from '@/stores/favorites.store'

const searchStore = useSearchStore()
const favoritesStore = useFavoritesStore()

const name = computed(() => searchStore.modalDetailPokemon?.name || '')
const url = computed(() => searchStore.modalDetailPokemon?.url || '')

const { data, isLoading, isError, error } = useGetPokemonDetail(name)

const onCloseModalDetailPokemon = () => {
  searchStore.closeModalDetailPokemon()
}

const pokemon = computed(() => {
  return {
    name: data.value?.name || '',
    types: data.value?.types.map((type) => type.type.name).join(', ') || '',
    weight: data.value?.weight || 0,
    height: data.value?.height || 0,
    image: data.value?.sprites.front_default || '',
  }
})

const isFavorite = computed(() => {
  return !!favoritesStore.items[name.value]
})

const onShareModalDetailPokemon = () => {
  const text = `Name:${pokemon.value.name}\nWeight:${pokemon.value.weight}\nHeight:${pokemon.value.height}\nTypes:${pokemon.value.types} \nImage:${pokemon.value.image}`
  navigator.clipboard.writeText(text)
  console.log(`Copied to clipboard:\n${text}`)
}

const onToggleFavorite = () => {
  favoritesStore.toggle({
    name: name.value,
    url: url.value,
  })
}
</script>

<template>
  <ModalDetailPokemonView
    :pokemon="pokemon"
    :isFavorite="isFavorite"
    :onShare="onShareModalDetailPokemon"
    :onToggleFavorite="onToggleFavorite"
    :isOpen="searchStore.isModalDetailPokemonOpen"
    :onClose="onCloseModalDetailPokemon"
  />
</template>
