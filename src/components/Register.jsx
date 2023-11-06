import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Suspense, lazy, useRef, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { estados } from '../constans'
import { speakers } from '../constans_speakers'
import { DetailSpeaker } from './DetailSpeaker'
import { Program } from './Program'
import { Menu } from './Menu'
import { GalleryPage } from './Gallery/GalleryPage'

const ReCAPTCHA = lazy(() => import('react-google-recaptcha'))

export function Register () {
  const captchaRef = useRef()
  const [captcha, setCaptcha] = useState(false)
  const [message, setMessage] = useState()
  const [sendStatus, setSendStatus] = useState(false)
  const navigate = useNavigate()

  const [estadoSeleccionado, setEstadoSeleccionado] = useState('')
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState('')
  
  const [modalShow, setModalShow] = useState(false)
  const [detailSpeaker, setDetailSpeaker] = useState({})

  const handleModal2 = (speaker) => {
    setDetailSpeaker(speaker)
    setModalShow(true)
  }
  const handleEstadoChange = (event) => {
    const estado = event.target.value
    setEstadoSeleccionado(estado)
    setMunicipioSeleccionado('')
  }

  const handleMunicipioChange = (event) => {
    setMunicipioSeleccionado(event.target.value)
  }

  const municipios = estadoSeleccionado ? estados[estadoSeleccionado] : []

  const onChange = () => {
    setCaptcha(true)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    if (captcha === false) {
      event.stopPropagation()
      setMessage('Please verify you are not bot.')
    } else {
      const token = captchaRef.current.getValue()
      captchaRef.current.reset()
      setCaptcha(false)
      const qrcode = uuidv4()
      const formData = Object.fromEntries(new window.FormData(event.target))

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, formData, qrcode })
      }
      const requestOptions2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData, qrcode })
      }
      try {
        setSendStatus(true)
        const res = await fetch(
          'https://hfmexico.mx/foro-nearshoring/backend/register.php',
          requestOptions
        )
        const data = await res.json()
        if (data === '23000') {
          setSendStatus(false)
          setMessage('Ya te encuentras registrado, por favor revisa tu correo.')
        } else if (data.status) {
          const statusEmail = await fetch('https://hfmexico.mx/foro-electromovilidad/backend/email/send-email2', requestOptions2)
          const dataEmail = await statusEmail.json()
          navigate('/registro-gratis', { state: { qrcode, formData, dataEmail } })
        } else {
          setSendStatus(false)
          setMessage('Lo sentimos no pudimos comprobar que no eres un robot...')
        }
      } catch (error) {
        console.log(error)
        setSendStatus(false)
        setMessage('Lo sentimos en este momento no es posible enviar tu información...')
      }
      document.getElementById('form-newsletter').reset()
    }
  }
  return (
    <>
    <Menu />
    <div className='vh-100'>
        <video className='bg-nearshoring' autoPlay muted loop src='/foro-nearshoring/bgNearshoring.webm' />
      <Container className='nearshoring-text'>
        <h1 className='fw-bold text-center py-5'> FORO NEARSHORING</h1><br />
        <p className='foro-frase mt-3'>Retos y oportunidades para Guanajuato.</p>
        <h2>¡No pierdas la oportunidad de estar con los especialistas <br></br> actuales del<strong style={{color: '#FEBE33'}}> Nearshoring</strong> y conoce las últimas tendencias!</h2>
        <p className='foro-frase mt-3'> Analizaremos las áreas de aprovechamiento en este relevante tema que genera empleos, inversión extranjera, infraestructura y desarrollo en la Industria Guanajuatense.</p>
        {/* <div className='foro-date'>
          <div>
            <p className='border-end'><strong>05</strong><br />
              <small>octubre</small>
            </p>
          </div>
          <div>
            <p className='border-end'>
              <strong>13:30 - 18:30</strong><br />
              <small>HRS</small>
            </p>
          </div>
          <div>
            <p><strong>POLIFORUM</strong><br />
              <small>LEÓN</small>
            </p>
          </div>
        </div><br /> */}
        {/* <Button className='boton-registro' href='#registro' variant='danger'>REGÍSTRATE AHORA</Button> */}
      </Container>
    </div>
        <Container className='mt-5'>
        <h2 className='text-center'>Temas segmentos de enfoque</h2>
        <Row className='mt-5'>
          <Col md={4} className='mt-5 text-center'>
            <img src='/foro-nearshoring/enfoques-economy.svg' width={100} height={100} alt='temas' />
            <p className='mt-4 fw-bold'>Economía</p>
          </Col>
          <Col  md={4} className='mt-5 text-center'>
            <img src='/foro-nearshoring/enfoques-inversion.svg' width={100} height={100} alt='temas' />
            <p className='mt-4 fw-bold'>Inversión extranjera</p>
          </Col>
          <Col  md={4} className='mt-5 text-center'>
            <img src='/foro-nearshoring/enfoques-desarrollo.svg' width={100} height={100} alt='temas' />
            <p className='mt-4 fw-bold'>Infraestructura y desarrollo</p>
          </Col>
          <Col  md={4} className='mx-auto mt-5 text-center'>
            <img src='/foro-nearshoring/enfoques-alianza.svg' width={100} height={100} alt='temas' />
            <p className='mt-4 fw-bold'>Alianzas estratégicas</p>
          </Col>
          <Col  md={4} className='mx-auto mt-5 text-center'>
            <img src='/foro-nearshoring/enfoques-industria.svg' width={100} height={100} alt='temas' />
            <p className='mt-4 fw-bold'>Sector industrial</p>
          </Col>
        </Row>        
        <Program />
        <h1 className='mt-5 text-light' id='ponentes'>Ponentes</h1>
        <p className='text-light' />
        <div className='mt-5 pb-5 program-wrapper-speakers'>
          {speakers.map((speaker, index) => (
            <button key={index} onClick={() => handleModal2(speaker)}>
              <div className='speaker-item h-100'>
                <img src={speaker.avatar} width={300} height={300} alt={speaker.name} />
                <div className='info_speakers'>
                  <h2>{speaker.name}</h2>
                  <p className='m-0'>{speaker.rol}</p>
                  <small>{speaker.company}</small>
                </div>
              </div>
            </button>
          ))}
          <div />
        </div>
        <DetailSpeaker
          show={modalShow}
          onHide={() => setModalShow(false)}
          speaker={detailSpeaker}
        />
      
      <GalleryPage />
      <h1 className='mt-5 text-light' id="registro">Contáctanos</h1>
      <Form className='mt-5' id='form-newsletter' onSubmit={handleSubmit} >
        <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formId'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type='text' name='nombre' required />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email' required />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formTel'>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type='number' name='telefono' required />
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formEmpresa'>
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control type='text' name='empresa' required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3' controlId='formCargo'>
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type='text' name='cargo' required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className='mb-3' controlId='formEstado'>
                <Form.Label>Selecciona un estado:</Form.Label>
                <Form.Select
                  onChange={handleEstadoChange}
                  value={estadoSeleccionado}
                  name='estado'
                  required
                >
                  <option value=''>-- Selecciona --</option>
                  {Object.keys(estados).map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formMunicipio'>
                <Form.Label>Municipio</Form.Label>
                {estadoSeleccionado && (
                  <>
                    <Form.Label>Selecciona un municipio:</Form.Label>
                    <Form.Select
                      onChange={handleMunicipioChange}
                      value={municipioSeleccionado}
                      name='municipio'
                      required
                    >
                      <option value=''>-- Selecciona --</option>
                      {municipios.map((municipio, index) => (
                        <option key={index} value={municipio}>
                          {municipio}
                        </option>
                      ))}
                    </Form.Select>
                  </>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Suspense fallback={<div>Loading reCAPTCHA...</div>}>
            <ReCAPTCHA
              sitekey='6LeljqwnAAAAAHcToBhu6iq8o4kahL9sopQjC1A3'
              ref={captchaRef}
              onChange={onChange}
            />
          </Suspense>
          {captcha ? '' : <div className='fw-bold' style={{ color: 'red' }}>{message}</div>}
          <Button variant='light' type='submit' className='mt-3 fw-bold'>
            {sendStatus
              ? <><Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' /><span> Loading...</span></>
              : 'ENVIAR'}
          </Button>
        </Form>   
        </Container>  
        <Container fluid className='justify-content-md-center mt-5 py-5' style={{backgroundColor:'hsla(240, 50%, 50%, 0.5)'}}>
          <Row>
            <Col sm={0} md={3} lg={3} className='text-center'></Col>
            <Col sm={12} md={6} lg={6} className='text-center'>
                <div className='w-100'>
                  <h2>CONTACTO</h2><br /><br />
                  <img src="/foro-nearshoring/FernandoAranda.webp" alt="fernando-aranda" className='pb-4' style={{width:'300px'}} />
                  <h3>Fernando Aranda</h3>
                  <h5>Manager Foro Nearshoring</h5>
                  <p><a href='mailto:fernando.aranda@igeco.mx' className='link link-correo text-center' style={{color:'#ffff', fontSize:'18px', textDecoration: 'none'}}>fernando.aranda@igeco.mx</a></p>
                </div>
            </Col>
            <Col sm={0} md={3} lg={3} className='text-center'></Col>
          </Row>
        </Container>
    </>
  )
}
