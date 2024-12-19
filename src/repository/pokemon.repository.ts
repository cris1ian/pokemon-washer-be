import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { IPokemonApiResponse } from '../models/pokemon.model'
import { IPokemonApiResp, IPokemonUrl } from '../models/pokemon-response.model'

export class PokemonRepository {
    private readonly apiClient: AxiosInstance
    private readonly pokemonApi: string = process.env.POKE_API ?? ''

    constructor() {
        this.apiClient = axios.create({ baseURL: process.env.POKE_API, timeout: 5000 })
    }

    async getPokemon(params: any): Promise<IPokemonApiResp<IPokemonUrl>> {
        console.log(params, params.limit, params.offset)
        try {
            const response: AxiosResponse<IPokemonApiResp<IPokemonUrl>> = await this.apiClient.get(`${this.pokemonApi}/pokemon`, {
                params,
            })
            return response.data
        } catch (error) {
            console.error(`Error fetching Pokémon:`, error)
            throw new Error('Failed to fetch Pokémon data')
        }
    }

    /** I'll use this one to batch fetch some URLs in other responses */
    async directUrlPokemonFetch(url: string): Promise<IPokemonApiResponse> {
        try {
            const response: AxiosResponse<IPokemonApiResponse> = await axios.get(url)
            return response.data
        } catch (error) {
            console.error(`Error fetching URL ${url}:`, error)
            throw new Error('Failed to fetch Pokémon data')
        }
    }
}
