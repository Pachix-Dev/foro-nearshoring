import { Col, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

export function DetailSpeaker (props) {
  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Row>
          <Col md={4} className='my-auto'>
            <div className='position-relative'>
              <img src={props?.speaker?.avatar} className='w-100' alt={props?.speaker.name} />
              <div className='info_speakers'>
                <h2>{props?.speaker?.name}</h2>
                <p className='m-0'>{props?.speaker.rol}</p>
                <small>{props?.speaker?.company}</small>
              </div>
            </div>
          </Col>
          <Col md={8} className='my-auto'>
            <h5 className='fw-bold text-danger'>Acerca de</h5>
            <p>
              {props?.speaker?.sketch || props?.speaker?.resume}
            </p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
