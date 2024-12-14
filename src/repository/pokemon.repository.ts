import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { IPokemon } from '../models/pokemon.model'
import { IApiPokemonArray } from '../models/pokemon-response.model'

export class PokemonRepository {
    private readonly apiClient: AxiosInstance
    private readonly pokemonApi: string = process.env.POKE_API ?? ''

    constructor() {
        this.apiClient = axios.create({ baseURL: process.env.POKE_API, timeout: 5000 })
    }

    async getPokemon(params: any): Promise<IApiPokemonArray<IPokemon>> {
        try {
            console.log(this.pokemonApi)
            const response: AxiosResponse<IApiPokemonArray<IPokemon>> = await this.apiClient.get(`${this.pokemonApi}/pokemon`, {
                params: { limit: params.limit ?? 20, offset: params.offset },
            })
            return response.data
        } catch (error) {
            console.error(`Error fetching Pokémon '${name}':`, error)
            throw new Error('Failed to fetch Pokémon data')
        }
    }
}
