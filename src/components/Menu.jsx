import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'


export function Menu () {

  return (
    <>
      <Navbar className='menu'>
        <Container>          
          <Nav className="ms-auto">
            <Nav.Link href="#registro">Registro</Nav.Link>
            <Nav.Link href="#ponentes">Ponentes</Nav.Link>
            <Nav.Link href="#programa">Programa</Nav.Link>
          </Nav>
        </Container>
      </Navbar>  
    </>
  )
}
