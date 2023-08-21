import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiChevronRight, BiLoaderCircle } from 'react-icons/bi'
import axios from 'axios'
import { IPeople } from 'swapi-ts/src/SWApi'
import { useCharacterContext } from '../contexts/characterContext'

export const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [characters, setCharacters] = useState<IPeople[]>([])
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    'https://swapi.dev/api/people/',
  )
  const { setSelectedCharacter } = useCharacterContext()

  const navigate = useNavigate()

  const onCharacterWebClick = (character: IPeople) => {
    setSelectedCharacter(character)
  }

  const onCharacterMobileClick = (character: IPeople) => {
    setSelectedCharacter(character)
    navigate('/detalle')
  }

  useEffect(() => {
    const getData = async (url: string) => {
      setIsLoading(true)
      const response = await axios.get(url)
      const data = response.data

      if (data.results) {
        const updatedCharacters: IPeople[] = await Promise.all(
          data.results.map(async (character: IPeople) => {
            const planetResponse = await axios.get(
              character.homeworld as string,
            )
            const planetData = planetResponse.data

            const speciesNames =
              character.species.length > 0
                ? await Promise.all(
                    character.species.map(async (speciesUrl) => {
                      const speciesResponse = await axios.get(
                        speciesUrl as string,
                      )
                      const speciesData = speciesResponse.data
                      return speciesData.name
                    }),
                  )
                : ['Human']

            const updatedCharacter: IPeople = {
              ...character,
              homeworld: planetData.name,
              species: speciesNames,
            }

            return updatedCharacter
          }),
        )
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...updatedCharacters,
        ])
        setNextPageUrl(data.next)
        setIsLoading(false)
      }
    }

    if (nextPageUrl) {
      getData(nextPageUrl)
    }
  }, [nextPageUrl])

  return (
    <section
      className={`h-[100vh] w-full md:border-r-2 md:w-96 border-gray-200  ${
        characters.length == 0 ? '' : 'h-full'
      }`}
    >
      {characters ? (
        characters.map((character: IPeople) => (
          <div key={character.url}>
            <div
              className='flex md:hidden py-4 pr-4 justify-between border-y '
              onClick={() => onCharacterMobileClick(character)}
            >
              <div>
                <h2 className='text-[#333333]'>{character.name}</h2>

                <p className='text-[#828282]'>{`${character.species.join(
                  ', ',
                )} from ${character.homeworld}`}</p>
              </div>
              <span className='self-center'>
                <BiChevronRight size={35} />
              </span>
            </div>
            <div
              className='py-4 pr-4 justify-between border-y hidden md:flex'
              onClick={() => onCharacterWebClick(character)}
            >
              <div>
                <h2 className='text-[#333333]'>{character.name}</h2>

                <p className='text-[#828282]'>{`${character.species.join(
                  ', ',
                )} from ${character.homeworld}`}</p>
              </div>
              <span className='self-center'>
                <BiChevronRight size={35} />
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center py-4'>
          <h2 className='text-[#EC5757]'>Failed to Load Data</h2>
        </div>
      )}
      {isLoading ? (
        <div className='flex justify-center gap-2 py-4'>
          <div className='self-center animate-spin'>
            <BiLoaderCircle size={25} color={'#828282'} />
          </div>
          <h2 className='text-[#828282]'>Loading</h2>
        </div>
      ) : (
        ''
      )}
    </section>
  )
}
