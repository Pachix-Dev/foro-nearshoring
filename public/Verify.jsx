import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export function Verify () {
  const { qr } = useParams()
  const [data, setData] = useState('')
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ qr })
  }

  useEffect(() => {
    fetch('https://hfmexico.mx/foro-electromovilidad/backend/verify.php',
      requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setData(data?.message)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [qr])

  return (
    <>
      <Container className='pt-5 mb-3'>
        <h1>{data}</h1>
      </Container>
    </>
  )
}
