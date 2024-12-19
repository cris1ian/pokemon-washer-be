import { IGetPokemonResp, IPokemonApiResp, IPokemonUrl } from '../models/pokemon-response.model'
import { IPokemonApiResponse, PokemonReduced } from '../models/pokemon.model'
import { PokemonRepository } from '../repository/pokemon.repository'

export class PokemonService {
    private readonly pokemonRepository: PokemonRepository

    constructor() {
        this.pokemonRepository = new PokemonRepository()
    }

    async getPokemon(params: { limit?: string; offset?: string }): Promise<IGetPokemonResp<PokemonReduced>> {
        const response: IPokemonApiResp<IPokemonUrl> = await this.pokemonRepository.getPokemon(params)
        const pokemonFetched: IPokemonApiResponse[] = await Promise.all(
            response.results.map((elem: IPokemonUrl) => this.pokemonRepository.directUrlPokemonFetch(elem.url))
        )
        return { data: pokemonFetched.map((elem) => new PokemonReduced(elem)), metadata: { count: response.count } }
    }
}
