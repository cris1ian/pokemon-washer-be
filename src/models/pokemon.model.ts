import { parseableUrl, Sprites } from './pokemon-sprites.model'

export interface IPokemonApiResponse {
    height: number
    id: number
    name: string
    is_default: boolean
    sprites: Sprites
}

export class PokemonReduced {
    id: number
    name: string
    spriteUrl: parseableUrl | null

    constructor(pokemon: IPokemonApiResponse) {
        this.id = pokemon.id
        this.name = pokemon.name
        this.spriteUrl = pokemon.sprites.other['official-artwork'].front_default
    }
}