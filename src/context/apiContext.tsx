'use client'

import { createContext, useContext, useState } from 'react'

export type Weapon = {
  name: string
  rangeNormal: number
  rangeLong: number
}

export type Spell = {
  name: string
  range: number
  aoe: number | null
  shape: string | null
}

interface ResultContextType {
  weapon: Weapon | null
  spell: Spell | null
  setWeapon: (weapon: Weapon) => void
  setSpell: (spell: Spell) => void
}

export const ResultContext = createContext<ResultContextType>({
  weapon: null,
  spell: null,
  setWeapon: () => {},
  setSpell: () => {}
})

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [weapon, setWeapon] = useState<Weapon | null>(null)
  const [spell, setSpell] = useState<Spell | null>(null)

  return (
    <ResultContext.Provider value={{ weapon, spell, setWeapon, setSpell }}>
      {children}
    </ResultContext.Provider>
  )
}

export const useResultContext = () => useContext(ResultContext)
