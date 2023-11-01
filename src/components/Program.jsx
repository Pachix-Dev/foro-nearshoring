import { useState } from 'react'
import { Accordion, Container, Nav, Tab, Tabs } from 'react-bootstrap'
import { DetailSpeaker } from './DetailSpeaker'
import { programITM } from '../constans_programa'
import { speakers } from '../constans_speakers.js'
import './Program.css' 

export function Program () {
    const [modalShow, setModalShow] = useState(false)
    const [programs, setPrograms] = useState(programITM.stage_1)
    const [detailSpeaker, setDetailSpeaker] = useState({})

    const handleModal = (id) => {
      const speaker = speakers.find(speaker => speaker.id === id)
      setDetailSpeaker(speaker)
      setModalShow(true)
    }
    
    return (
      <>
        <div className='program-wrapper' id='programa'>
          <Container className='pt-5'>
            <h1 className='text-light fw-font title-conferencias'>Programa</h1>
            <div className='program-dates mt-5'>
              <Tabs
                defaultActiveKey='day1'
                id='fill-tab-example'
                className='mb-3 mt-5'
              >
                <Tab eventKey='day1'>
                  {programs?.speakers.map((program, index) => {
                    return (
                      <div key={index} className='program-date-item'>
                        <div style={{ width: '100px' }}>
                          <center>
                          <svg className='py-2' width={30} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                          </svg>
                          <p style={{ width: '100px'}}>
                            <strong>{program.hour}</strong><br /> 
                            {/* - <br /><strong>{program.duration}</strong> */}
                          </p>
                          </center>
                        </div>
                        <div>
                          <div className='w-100'>
                            <h2>{program.event}</h2>
                            <p>{program.name}</p>
                            {/*<p>{program.rol}</p>*/}
                          </div>
                          <div className='d-inline-flex img-responsive'>
                          {
                            program.avatar === ''
                              ? ''
                              : <img onClick={() => handleModal(program?.id)} src={program.avatar} width={100} height={100} className='rounded-circle program-date-avatar ms-2' alt='speaker' />
                            }
                            {
                            program.avatar2 === ''
                              ? ''
                              : <img onClick={() => handleModal(program?.id_s2)} src={program.avatar2} width={100} height={100} className='rounded-circle program-date-avatar ms-2' alt='speaker' />
                            }
                            {
                            program.avatar3 === ''
                              ? ''
                              : <img onClick={() => handleModal(program?.id_s3)} src={program.avatar3} width={100} height={100} className='rounded-circle program-date-avatar ms-2' alt='speaker' />
                            }
                            {
                            program.avatar4 === ''
                              ? ''
                              : <img onClick={() => handleModal(program?.id_s4)} src={program.avatar4} width={100} height={100} className='rounded-circle program-date-avatar ms-2' alt='speaker' />
                            }
                            {
                            program.avatar5 === ''
                              ? ''
                              : <img onClick={() => handleModal(program?.id_s5)} src={program.avatar5} width={100} height={100} className='rounded-circle program-date-avatar ms-2' alt='speaker' />
                            }
                            {
                              program.avatar6 === ''
                                ? ''
                                : <img onClick={() => handleModal(program?.id_s6)} src={program.avatar6} width={100} height={100} className='rounded-circle program-date-avatar ms-2' alt='speaker' />
                              }
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </Tab>
              </Tabs>
            </div>
          </Container>
          {/* <DetailSpeaker
            show={modalShow}
            onHide={() => setModalShow(false)}
            speaker={detailSpeaker}
          /> */}
        </div>
      </>
    )
  }
  