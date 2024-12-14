import { IApiPokemonArray } from '../models/pokemon-response.model';
import { IPokemon } from '../models/pokemon.model'
import { PokemonRepository } from '../repository/pokemon.repository'

export class PokemonService {
    private readonly pokemonRepository: PokemonRepository

    constructor() {
        this.pokemonRepository = new PokemonRepository()
    }

    async getPokemon(params: { limit?: string; offset?: string }): Promise<IApiPokemonArray<IPokemon>> {
        const pokemon = await this.pokemonRepository.getPokemon(params)
        return pokemon
    }
}
