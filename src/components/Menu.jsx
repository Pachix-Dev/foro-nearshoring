import { useState } from 'react'
import { Container, Offcanvas, Nav, Navbar } from 'react-bootstrap'


export function Menu () {
  const [show, setShow] = useState()
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  return (
    <>
      <Navbar expand='lg' className='menu py-2'>
        <Container>
          <Navbar.Brand>
            <img src='/igeco_bn.webp' alt='igeco' width='170' className='company-logo' />
            <img src='/deutsche_messe_bn.webp' alt='deutsche-messe' width='170' className='company-logo' />
          </Navbar.Brand>
          {/* <Navbar.Toggle onClick={handleShow} /> */}
          <Navbar.Offcanvas
            id='offcanvasMenuweb'
            aria-labelledby='offcanvasMenuweb'
            placement='end'
            show={show}
          >
            <Offcanvas.Header closeButton onClick={handleClose} />
            <Offcanvas.Body className='ms-auto'>
              <Nav className='justify-content-end' activeKey='/home'>
                <Nav.Link className='menu-item' href='#ponentes' onClick={handleClose}>Ponentes</Nav.Link>
                <Nav.Link className='menu-item' href='#programa' onClick={handleClose}>Programa</Nav.Link>
                <Nav.Link className='menu-item' href='#galeria' onClick={handleClose}>Galeria</Nav.Link>
                <Nav.Link className='menu-item' href='#registro' onClick={handleClose}>Registro</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}
