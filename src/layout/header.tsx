import { useLocation, useNavigate } from 'react-router-dom'
import { useCharacterContext } from '../contexts/characterContext'
import { BiChevronLeft } from 'react-icons/bi'
export const Header = () => {
  const { selectedCharacter } = useCharacterContext()

  const navigate = useNavigate()
  const location = useLocation()
  const isRoot = location.pathname === '/'

  const onButtonClick = () => {
    navigate('/')
  }
  return (
    <header className='bg-black fixed left-0 top-0 w-full flex px-2'>
      <button
        onClick={onButtonClick}
        className={`text-white md:hidden absolute top-3 left-4  ${
          isRoot ? 'hidden' : 'block'
        }`}
      >
        <BiChevronLeft size={35} />
      </button>
      <h1
        className={`text-white font-sans font-medium text-lg text-center  py-4  w-full md:hidden`}
      >
        {isRoot ? 'People of Star Wars' : selectedCharacter?.name}
      </h1>
      <div className='hidden md:flex justify-between w-full py-4 px-8'>
        <h1 className='text-white font-sans font-medium text-lg text-left  '>
          Ravn Star Wars Registry
        </h1>
        <span className='text-white font-sans font-medium text-lg self-center'>
          {selectedCharacter?.name}
        </span>
      </div>
    </header>
  )
}
