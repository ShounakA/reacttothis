'use client'
import { useState, createContext, SetStateAction, Dispatch, useContext } from "react";
import { PokeDex } from "./PokeDex";
import { ToastContainer } from "react-toastify";

const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>] | null>(null);

const ThemeOption = ({ className }: { className?: string }) => {
  // EX useContext 
  const themeCtx = useContext(ThemeContext);
  if (themeCtx) {
    const [theme, setTheme] = themeCtx;
    return (
      <>
        {/* EX using previous state */}
        <button className={className} onClick={() => setTheme(prev => prev === 'dark' ? 'light': 'dark')}>
          {theme.toUpperCase()}
        </button>
      </>
    )
  }
}

export default function Home() {
  const themeState = useState('dark');
  return (
    <ThemeContext.Provider value={themeState}>
      <main className={themeState[0]}>
        <div className="flex min-h-screen flex-col items-center p-24 bg-background dark:bg-background text-text dark:text-text">
          <ThemeOption className="text-right" />
          <div className="cursor-pointer flex flex-row p-2">
            <PokeDex />
          </div>
        </div>
        <ToastContainer position="top-right"/>
      </main>
    </ThemeContext.Provider>
  );
}
