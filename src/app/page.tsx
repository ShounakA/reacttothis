'use client'
import { useState, createContext, SetStateAction, Dispatch, useContext } from "react";
import Image from 'next/image'
import { PokeDex } from "./PokeDex";
import pokeball from '@/../public/Pokeball.png';

const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>] | null>(null);

const ThemeOption = ({ className }: { className?: string }) => {
  const themeCtx = useContext(ThemeContext);
  if (themeCtx) {
    const [theme, setTheme] = themeCtx;
    return (
      <button className={className} onClick={() => setTheme(prev => prev === 'dark' ? 'light': 'dark')}>
        {theme.toUpperCase()}
      </button>
    )
  }
}

export default function Home() {
  
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
    <main className={theme}>
      <div className="flex min-h-screen flex-col items-center p-24 bg-background dark:bg-background text-text dark:text-text">
        <ThemeOption className="text-right" />
        <div className="cursor-pointer flex flex-row p-2">
          <PokeDex />
        </div>
        <div className="flex flex-row">
          <Image src={pokeball} alt='Pokeball' width='64' height='64'/>
          <Image src={pokeball} alt='Pokeball' width='64' height='64'/>
          <Image src={pokeball} alt='Pokeball' width='64' height='64'/>
          <Image src={pokeball} alt='Pokeball' width='64' height='64'/>
          <Image src={pokeball} alt='Pokeball' width='64' height='64'/>
          <Image src={pokeball} alt='Pokeball' width='64' height='64'/>
        </div>
      </div>
    </main>
    </ThemeContext.Provider>
  );
}
