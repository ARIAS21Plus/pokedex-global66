import { pokemonApi } from '@/http/instances-http'
import { ENDPOINTS } from '@/http/endpoints'
import type { Pokemon, PokemonListResponse } from '@/types/pokemon.types'

export const pokemonService = {
  /**
   * Gets the list of pokémons with pagination
   * @param limit - The number of pokémons per page
   * @param offset - The number of pokémons to skip
   * @returns The list of pokémons
   */
  async getList({
    limit = 20,
    offset = 0,
  }: {
    limit?: number
    offset?: number
  }): Promise<PokemonListResponse> {
    return pokemonApi.get<PokemonListResponse>(ENDPOINTS.pokemon.list(limit, offset))
  },

  /**
   * Searches pokémons by name
   * @param name - The pokémon name to search
   * @returns The matching pokémon
   */
  async searchByName(name: string): Promise<Pokemon> {
    return pokemonApi.get<Pokemon>(ENDPOINTS.pokemon.detail(name.toLowerCase()))
  },
}
