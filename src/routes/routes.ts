import { Express } from 'express'
import { PokemonController } from '../controllers/pokemon.controller'
// import { AuthController } from "../controllers/auth.controller";

export class AppRoutes {
    private api = process.env.API_VERSION

    private readonly pokemonController: PokemonController
    //   private readonly authController: AuthController;

    constructor() {
        this.pokemonController = new PokemonController()
        // this.authController = new AuthController();
    }

    public registerRoutes(app: Express): void {
        app.get(`${this.api}/pokemon`, this.pokemonController.getPokemon.bind(this.pokemonController))

        // Auth routes
        // app.post(`${api}/auth/verify-token`, this.authController.verifyToken);
        // app.post(`${api}/auth/register`, this.authController.register);
        // app.post(`${api}/auth/login`, this.authController.login);
    }
}
