import { Request, Response } from 'express'
import { PokemonService } from '../services/pokemon.service'
import { ResponseUtils } from '../utils/response.utils'
import { PokemonReduced } from '../models/pokemon.model'
import { IGetPokemonResp } from '../models/pokemon-response.model'

export class PokemonController {
    private pokemonService: PokemonService

    constructor() {
        this.pokemonService = new PokemonService()
    }

    public async getPokemon(req: Request, res: Response): Promise<void> {
        const limit = typeof req.query.limit === 'string' ? req.query.limit : undefined
        const offset = typeof req.query.offset === 'string' ? req.query.offset : undefined

        try {
            const pokemon: IGetPokemonResp<PokemonReduced> = await this.pokemonService.getPokemon({ limit, offset })
            res.status(200).send(ResponseUtils.getSuccessResponse('Pokemon fetched successfully', pokemon))
        } catch (error) {
            console.error(error)
            res.status(500).send(ResponseUtils.getErrorResponse('Error en el servidor', error))
        }
    }
}
