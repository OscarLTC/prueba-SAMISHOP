import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import { CharacterDetails } from './components/characterDetails'
import { Sidebar } from './components/sidebar'
import { CharacterProvider } from './contexts/characterContext'
import { Layout } from './layout/layout'

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <div className='md:flex pl-4 mt-14'>
                  <Sidebar />
                  <div className='hidden md:block'>
                    <CharacterDetails />
                  </div>
                </div>
              </Layout>
            }
          />
          <Route
            path='/detalle/'
            element={
              <Layout>
                <CharacterDetails />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </CharacterProvider>
  )
}

export default App
