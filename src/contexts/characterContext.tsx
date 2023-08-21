import React, { ReactNode, createContext, useContext, useState } from 'react'
import { IPeople } from 'swapi-ts'

interface CharacterContextType {
  selectedCharacter: IPeople | null
  setSelectedCharacter: React.Dispatch<React.SetStateAction<IPeople | null>>
}

interface CharacterProviderProps {
  children: ReactNode
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined,
)

export const useCharacterContext = () => {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error(
      'useCharacterContext must be used inside a CharacterProvider',
    )
  }
  return context
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<IPeople | null>(
    null,
  )

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        setSelectedCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}
