import { Express } from 'express'
import { PokemonController } from '../controllers/pokemon.controller'
// import { AuthController } from "../controllers/auth.controller";

export class AppRoutes {
    private api = process.env.API_VERSION

    private readonly pokemonController: PokemonController

    constructor(app: Express) {
        this.pokemonController = new PokemonController()
        this.registerRoutes(app)
    }

    public registerRoutes(app: Express): void {
        app.get(`${this.api}/pokemon`, this.pokemonController.getPokemon.bind(this.pokemonController))
    }
}
