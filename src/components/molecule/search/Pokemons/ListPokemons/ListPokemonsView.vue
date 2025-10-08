<script setup lang="ts">
import ItemPokemonContainer from '@/components/molecule/search/Pokemons/ItemPokemon/ItemPokemonContainer.vue'

const props = defineProps<{
  pokemons: {
    url: string
    name: string
  }[]
  onOpenModalDetailPokemon: (pokemon: { url: string; name: string }) => void
}>()
</script>

<template>
  <div class="space-y-2.5">
    <ItemPokemonContainer
      v-for="pokemon in props.pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
      :onOpenModalDetailPokemon="onOpenModalDetailPokemon"
    />
  </div>
</template>
