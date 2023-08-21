import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCharacterContext } from '../contexts/characterContext'
import { IPeople } from 'swapi-ts/src/SWApi'
import { BiLoaderCircle } from 'react-icons/bi'

export const CharacterDetails = () => {
  const { selectedCharacter } = useCharacterContext()
  const [character, setCharacter] = useState<IPeople>()
  const [isVehiclesLoading, setIsVehiclesLoading] = useState(true)

  useEffect(() => {
    const getCharacterData = async () => {
      if (selectedCharacter) {
        try {
          setIsVehiclesLoading(true)
          const vehiclesNames = await Promise.all(
            selectedCharacter.vehicles.map(async (vehicleUrl) => {
              const vehicleResponse = await axios.get(vehicleUrl as string)
              const vehicleData = vehicleResponse.data
              return vehicleData.name
            }),
          )
          setCharacter({
            ...selectedCharacter,
            vehicles:
              vehiclesNames.length > 0 ? vehiclesNames : ['No vehicle found'],
          })
          setIsVehiclesLoading(false)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getCharacterData()
  }, [selectedCharacter])

  return (
    character && (
      <div className='w-full px-10 md:px-32'>
        <div className='mt-14 md:mt-0 md:fixed  lg:w-[40%] xl:w-[55%]'>
          <h2 className='pt-10 mb-2'>General Information</h2>
          <div className='text-lg justify-between font-bold flex py-3 border-b-2'>
            <h3 className='text-[#828282]'>Eye Color</h3>
            <p className='self-center text-lg text-[#333333] capitalize'>
              {character.eye_color}
            </p>
          </div>
          <div className='text-lg justify-between font-bold flex py-3 border-b-2'>
            <h3 className='text-[#828282]'>Hair Color</h3>
            <p className='self-center text-lg text-[#333333] capitalize'>
              {character.hair_color}
            </p>
          </div>
          <div className='text-lg justify-between font-bold flex py-3 border-b-2'>
            <h3 className='text-[#828282]'>Skin Color</h3>
            <p className='self-center text-lg text-[#333333] capitalize'>
              {character.skin_color}
            </p>
          </div>
          <div className='text-lg justify-between font-bold flex py-3 border-b-2'>
            <h3 className='text-[#828282]'>Birth Year</h3>
            <p className='self-center text-lg text-[#333333] capitalize'>
              {character.birth_year}
            </p>
          </div>
        </div>
        <div className='mt-5 md:mt-0 md:top-96 md:fixed lg:w-[40%] xl:w-[55%]'>
          <h2 className='pt-2 mb-2'>Vehicles</h2>
          {isVehiclesLoading ? (
            <div className='flex text-lg font-bold py-3 border-b-2'>
              <div className='self-center animate-spin'>
                <BiLoaderCircle size={25} color={'#828282'} />
              </div>
              <h2 className='text-[#828282]'>Loading</h2>
            </div>
          ) : (
            character.vehicles.map((vehicle, index) => (
              <div
                key={index}
                className='text-lg justify-between font-bold flex py-3 border-b-2'
              >
                <h3 className='text-[#828282]'>{vehicle as string}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    )
  )
}
