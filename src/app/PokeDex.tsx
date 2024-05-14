'use client'

import { useReducer, useEffect, useRef, useState } from "react";
import { FaPlay, FaRedo } from "react-icons/fa";
import { PokeReducer, reducer, initialState, newPokeDexLoadAction, newPokeDexNewPokemonAction, newPokeDexErrorAction } from "./pokeReducer";
import { getDescriptionSound, loadPokeDexData } from "./services";

type SpeechPlayerProps = {
    ttsMessage: string
}
  
const TextToSpeechPlayer = ({ttsMessage}: SpeechPlayerProps) => {
    const playerRef = useRef<HTMLAudioElement>(null);
    const [tts, setTts] = useState<string | undefined>();
    const [ready, setReady] = useState(false);
  
    // Re-render when there is a new ttsMessage
    useEffect(() => {
      const cancellerService = new AbortController();
      const cancelSignal = cancellerService.signal;
      if (ttsMessage) {
        getDescriptionSound(ttsMessage, cancelSignal)
        .then(objUrl => {
          setTts(objUrl);
          playerRef.current?.load()
          setReady(true)
        });
      }
      return () => {
        if (tts) URL.revokeObjectURL(tts);
        cancellerService.abort('Component re-rendering')
      }
    }, [ttsMessage]);
  
    return <>
      <audio ref={playerRef} src={tts}></audio>
      <button onClick={() => playerRef.current?.play()} disabled={!ready}><FaPlay/></button>
      <br/>
    </>
}
  
export function PokeDex() {
  const [state, dispatch] = useReducer<PokeReducer>(reducer, initialState);
  const pokemonIsReady = (pokemonElements: JSX.Element) => !state.loading ? pokemonElements : null;
  
  // EXAMPLE: On Mount
  // EXAMPLE: On Destroy
  useEffect(() => {
    dispatch({type: 'POKEDEX.PICK_POKEMON'});
    return () => {
      dispatch(newPokeDexLoadAction(true));
    }
  }, []);

  // After Species ID has changed.
  useEffect(() => {
    const cancellerService = new AbortController();
    const cancelSignal = cancellerService.signal;
    if (state.speciesId > 0) {
      loadPokeDexData(state.speciesId, cancelSignal)
      .then(([poke, desc]) => {
        dispatch(newPokeDexNewPokemonAction(poke, desc));
      })
      .catch((error) => {
        dispatch(newPokeDexErrorAction(new Error(error)))
      });
    }
    return () => {
      cancellerService.abort('Component re-render')
    }
  }, [state.speciesId]);
  return (
    <div className="m-2 h-64 w-64 border-2 rounded-2xl bg-primary border-secondary">
          { pokemonIsReady(
            <>
              <div className="flex flex-col max-h-64 overflow-y-clip select-none">
                <div className="flex flex-row justify-between m-3">
                  <h2>{state?.pokemon?.name.toUpperCase()}</h2>
                  <button onClick={() => dispatch({type: 'POKEDEX.PICK_POKEMON'})}>
                    <FaRedo/>
                  </button>
                </div>
                <div className="flex flex-row justify-evenly">
                  <img src={state?.pokemon?.sprites?.front_default}></img>
                  <img src={state?.pokemon?.sprites?.back_default}></img>
                </div>
                <span className="m-3 overflow-y-auto">
                  <TextToSpeechPlayer ttsMessage={state?.description!} />
                  <span className="p-3">
                    {state?.description}
                  </span>
                </span>
              </div>
            </>
          )}
    </div>
    );
}

export function PokemonRoster() {
  
}