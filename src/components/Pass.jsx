import { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import QRCode from 'react-qr-code'
import { useLocation } from 'react-router-dom'

export function Pass () {
  const location = useLocation()

  const ticketRef = useRef(null)

  useEffect(() => {
    if (!location.state) {
      window.location.href = '/foro-electromovilidad/'
    }

    const ticket = ticketRef.current
    const { width, height } = ticket.getBoundingClientRect()
    const halfwidth = width / 2
    const halfheight = height / 2

    const handleMouseMove = (event) => {
      const rotateX = ((event.offsetX - halfwidth) / halfwidth) * 15
      const rotateY = ((event.offsetY - halfheight) / halfheight) * 15
      ticket.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      ticket.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }

    ticket.addEventListener('mousemove', handleMouseMove)
    ticket.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      ticket.removeEventListener('mousemove', handleMouseMove)
      ticket.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [location])

  return (
    <div className=''>
      {location?.state?.qrcode &&
        <Container>
          <Row>
            <Col md={6} className='mx-auto'>
              <div
                className='w-100 Ticket'
                ref={ticketRef}
              >
                <div className='bg-transparent'>
                  <div className='bg-ticket'>
                    <div className='d-flex justify-content-between align-items-center'>

                      <div className='d-flex align-items-center'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6' width={50}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        <p className='m-0'>
                          {location?.state?.formData?.nombre}<br />
                          {location?.state?.formData?.empresa}
                        </p>
                      </div>
                      <QRCode
                        size={256}
                        style={{ height: 'auto', width: '80' }}
                        value={'https:///hfmexico.mx/foro-nearshoring/verify/' + location?.state?.qrcode}
                        viewBox='0 0 256 256'
                      />
                    </div>
                    <div className='text-center'>
                      <h2>Foro Nearshoring</h2>
                      5 de octubre de 2023 13:30 HRS<br />
                      <img src='/foro-nearshoring/igecoLogo.webp' alt='igeco' width={300} className='mt-4' />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='pt-5'>
            <Col md={6} className='mx-auto'>
              <h1>¡Estás registrado en Foro Nearshoring!</h1><br />
              {location?.state?.dataEmail?.status
                ? <p>Te enviamos tu pase por correo electronico no olvides revisar tu buzon de spam si no lo encuentras en tu bandeja de entrada.</p>
                : <p>No hemos podido enviarte tu pase al correo que nos compartiste, por favor guarda este QR y presentalo el dia del evento.</p>}
            </Col>
          </Row>
        </Container>}
    </div>
  )
}
