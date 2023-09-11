import { Route, Routes } from 'react-router-dom'
import { Register } from './components/Register'
import './App.css'
import { Pass } from './components/Pass'
import { Container } from 'react-bootstrap'
import { Verify } from './components/Verify'

export function App () {
  return (
    <>
      <div className='foro-nearshoring'>
        <div className='wrapper-main-foro pb-5'>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/registro-gratis' element={<Pass />} />
            <Route path='/verify/:qr' element={<Verify />} />
          </Routes>
        </div>
      </div>
      <footer className=''>
        {/* <Container>
          <div className='d-inline-block text-center'>
            <img src='/foro-nearshoring/igecoLogo.webp' alt='igeco' width={300} />
            <img src='/foro-nearshoring/GTO 200 WT.webp' alt='gto-200años' width={130} />
          </div>
        </Container> */}
        <Container>
          <div class='d-flex bd-highlight'>
            <div class=' bd-highlight' style={{ width: '200px' }}><img src='/foro-nearshoring/igeco_bn.webp' alt='igeco' className='w-100' /></div>
            <div class=' bd-highlight' style={{ width: '200px' }}><img src='/foro-nearshoring/deutsche_messe_bn.webp' alt='igeco' className='w-100' /></div>
            <div class=' ms-auto' style={{ width: '200px' }}><img src='/foro-nearshoring/logo-gto.webp' alt='gto-200años' className='w-100' /></div>
          </div>
        </Container>
      </footer>
    </>
  )
}
