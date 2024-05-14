
export type Pokemon = {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    sprites: {      
      back_default: string
      back_female: string
      back_shiny: string
      back_shiny_female: string
      front_default: string
      front_female: string
      front_shiny: string
      front_shiny_female: string
    }
    species: {
      name: string
      url: string
    }
}

export type Species = {
  id: number
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[]
  form_descriptions: {
    description: string
  }[]
}