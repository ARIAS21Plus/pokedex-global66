import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { pokemonService } from '@/services/pokemon.service'
import type { PokemonListResponse, Pokemon } from '@/types/pokemon.types'

// Mock de fetch global
global.fetch = vi.fn()

describe('pokemonService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getList', () => {
    it('debe llamar al endpoint correcto con limit y offset por defecto', async () => {
      const mockResponse: PokemonListResponse = {
        count: 1302,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await pokemonService.getList({})

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v2/pokemon?limit=20&offset=0'),
        expect.any(Object),
      )
      expect(result).toEqual(mockResponse)
    })

    it('debe usar limit y offset personalizados', async () => {
      const mockResponse: PokemonListResponse = {
        count: 1302,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=60&limit=30',
        previous: null,
        results: [],
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await pokemonService.getList({ limit: 30, offset: 30 })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v2/pokemon?limit=30&offset=30'),
        expect.any(Object),
      )
    })

    it('debe retornar una lista de pokémons', async () => {
      const mockResponse: PokemonListResponse = {
        count: 1302,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await pokemonService.getList({})

      expect(result.results).toHaveLength(2)
      expect(result.count).toBe(1302)
    })
  })

  describe('searchByName', () => {
    it('debe convertir el nombre a minúsculas', async () => {
      const mockPokemon: Partial<Pokemon> = {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      })

      await pokemonService.searchByName('PIKACHU')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v2/pokemon/pikachu'),
        expect.any(Object),
      )
    })

    it('debe retornar los datos del pokémon buscado', async () => {
      const mockPokemon: Partial<Pokemon> = {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      })

      const result = await pokemonService.searchByName('pikachu')

      expect(result.name).toBe('pikachu')
      expect(result.id).toBe(25)
    })

    it('debe llamar al endpoint de detalle correcto', async () => {
      const mockPokemon: Partial<Pokemon> = {
        id: 6,
        name: 'charizard',
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      })

      await pokemonService.searchByName('charizard')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v2/pokemon/charizard'),
        expect.any(Object),
      )
    })
  })

  describe('manejo de errores', () => {
    it('debe lanzar error cuando la respuesta no es ok (404)', async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
        url: 'https://pokeapi.co/api/v2/pokemon/notfound',
        text: async () => JSON.stringify({ message: 'Not Found' }),
      })

      await expect(pokemonService.searchByName('notfound')).rejects.toThrow()
    })

    it('debe lanzar error cuando hay un problema de red', async () => {
      ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'))

      await expect(pokemonService.getList({})).rejects.toThrow('Network error')
    })
  })
})
