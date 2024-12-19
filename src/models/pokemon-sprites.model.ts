export type parseableUrl = string

export interface Sprites {
    back_default: parseableUrl | null
    back_female: parseableUrl | null
    back_shiny: parseableUrl | null
    back_shiny_female: parseableUrl | null
    front_default: parseableUrl | null
    front_female: parseableUrl | null
    front_shiny: parseableUrl | null
    front_shiny_female: parseableUrl | null
    other: {
        dream_world: {
            front_default: parseableUrl | null
            front_female: parseableUrl | null
        }
        home: {
            front_default: parseableUrl | null
            front_female: parseableUrl | null
            front_shiny: parseableUrl | null
            front_shiny_female: parseableUrl | null
        }
        'official-artwork': {
            front_default: parseableUrl | null
            front_shiny: parseableUrl | null
        }
        showdown: {
            back_default: parseableUrl | null
            back_female: parseableUrl | null
            back_shiny: parseableUrl | null
            back_shiny_female: parseableUrl | null
            front_default: parseableUrl | null
            front_female: parseableUrl | null
            front_shiny: parseableUrl | null
            front_shiny_female: parseableUrl | null
        }
    }
}
