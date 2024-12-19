export interface IPokemonApiResp<T = any> {
    count: 1302
    next: string | null
    previous: string | null
    results: T[]
}

export interface IPokemonUrl {
    name: string
    url: string
}

export interface IGetPokemonResp<T = any> {
    data: T[]
    metadata: {
        count: number
    }
}
