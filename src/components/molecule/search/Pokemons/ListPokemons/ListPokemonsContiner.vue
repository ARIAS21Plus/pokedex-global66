<script setup lang="ts">
import { useSearchStore } from '@/stores/search.store'
import ListPokemonsView from '@/components/molecule/search/Pokemons/ListPokemons/ListPokemonsView.vue'

const searchStore = useSearchStore()
const props = defineProps<{
  pokemons: {
    url: string
    name: string
  }[]
}>()

const onOpenModalDetailPokemon = (pokemon: { url: string; name: string }) => {
  searchStore.setModalDetailPokemon(pokemon)
}
</script>

<template>
  <ListPokemonsView
    :pokemons="props.pokemons"
    :onOpenModalDetailPokemon="onOpenModalDetailPokemon"
  />
</template>
