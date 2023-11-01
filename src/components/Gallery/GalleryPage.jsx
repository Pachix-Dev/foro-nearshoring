/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import { Container } from 'react-bootstrap'
import { gallery2023 } from './constans_gallery'
import { GalleryYear } from './GalleryYear'
import './GalleryPage.css'

export function GalleryPage () {
    return (
        <>
        <center><h1 id='galeria' className='title-gallery'>Galeria <br /> Foro de Electromovilidad 2023</h1></center>
            <Container className='galleryPage mt-5'>
            <GalleryYear gallery={gallery2023} />
            </Container>
        </>
    )
}
