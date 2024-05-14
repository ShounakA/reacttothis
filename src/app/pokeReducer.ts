import { Reducer } from "react"
import { Pokemon } from "./models"

type PokeDexLoadingAction = {
    type: 'POKEDEX.LOADING'
    payload: {
        loading: boolean
    }
}

type PokeDexNewPokemonAction = {
    type:  'POKEDEX.POKEMON'
    payload: {
        pokemon: Pokemon,
        description: string
    }
}

type PokeDexErrorAction = {
    type: 'POKEDEX.ERROR'
    payload: {
        error: Error
    }
}

type PokeDexPickAction = {
    type: 'POKEDEX.PICK_POKEMON'
}

/**
 * Generates a pokemon ID from 1-500
 */
const randomPokemonId = () => {
    return Math.floor(Math.random() * 500) + 1;
  }

export type PokeDexState = {
    pokemon: Pokemon | null
    loading: boolean
    error: Error | null
    description: string | null
    speciesId: number 
}

export const initialState: PokeDexState = {
    loading: true,
    pokemon: null,
    description: null,
    error: null,
    speciesId: -1
}

export type PokeDexAction = PokeDexLoadingAction | PokeDexNewPokemonAction | PokeDexErrorAction | PokeDexPickAction;
export type PokeReducer = Reducer<PokeDexState, PokeDexAction>;

// EX: useReducer logic
// Actions dispatched by the component are called here.
export function reducer(state: PokeDexState, action: PokeDexAction) {
    switch(action.type) {
        case 'POKEDEX.LOADING':
            return {
                ...state,
                loading: action.payload.loading
            }
        case 'POKEDEX.POKEMON':
            return {
                ...state,
                pokemon: action.payload.pokemon,
                description: action.payload.description,
                loading: false
            }
        case 'POKEDEX.ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'POKEDEX.PICK_POKEMON':
            return {
                ...state,
                speciesId: randomPokemonId(),
                pokemon: null,
                description: null,
                loading: true
            }
        default:
            return state;
    }
}

export const newPokeDexLoadAction = (loading: boolean): PokeDexLoadingAction => ({
    type: 'POKEDEX.LOADING',
    payload: {
        loading
    }
});


export const newPokeDexNewPokemonAction = (pokemon: Pokemon, description: string): PokeDexNewPokemonAction => ({
    type: 'POKEDEX.POKEMON',
    payload: {
        pokemon,
        description,
    }
});

export const newPokeDexErrorAction = (error: Error): PokeDexErrorAction => ({
    type: 'POKEDEX.ERROR',
    payload: {
        error
    }
})