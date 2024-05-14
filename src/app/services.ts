import { Pokemon, Species } from "./models";


/**
 * Gets the specified pokemon
 * @param pokemonId Pokemon ID
 * @returns a Promise to a Pokemon
 */
export const getPokemon = (pokemonId: number, cancelSignal: AbortSignal): Promise<Pokemon> => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, { signal: cancelSignal })
    .then(resp => resp.json());
}

/**
 * Gets a random description of the specified pokemon species.
 * @param pokemonId Pokemon Species ID (same as pokemon ID)
 * @returns a Promise to a random description of the pokemon species
 */
export const getRandomSpeciesDescription = (pokemonId: number,  cancelSignal: AbortSignal) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`, { signal: cancelSignal })
  .then(resp => resp.json())
  .then(spec => {
    const species = spec as Species
    const texts = species.flavor_text_entries.filter(t => t.language.name === 'en');
    const randIndex = Math.floor(Math.random() * texts.length);

    return texts[randIndex].flavor_text;
  });
}

/**
 * Gets TTS Description sound, and saves to object store.
 * @param ttsMessage TTS Message, provide pure string, this method will encode.
 * @param cancelSignal cancellation signal
 * @returns Object URL
 */
export const getDescriptionSound = (ttsMessage: string,  cancelSignal: AbortSignal) => {
  const text = encodeURI(ttsMessage)
  return fetch(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${text}`, { signal: cancelSignal })
  .then(resp => resp.blob())
  .then(blob => URL.createObjectURL(blob));
}

/**
 * Asyncronously load Pokemon data
 * @param pokemonId Pokemon Species ID
 * @param cancelSignal Cancellation signal
 * @returns Promise to a list containing a Pokemon and string
 */
export const loadPokeDexData = (pokemonId: number, cancelSignal: AbortSignal) => {
  const pokemonPromise = getPokemon(pokemonId, cancelSignal);
  const speciesPromise = getRandomSpeciesDescription(pokemonId, cancelSignal);
  return Promise.all([
    pokemonPromise,
    speciesPromise
  ])
}