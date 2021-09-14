import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Project() {
    console.log('project >>');
    const { id } = useParams();

    return (
        <Container className="mt-20">
            <div>Project {id}</div>
        </Container>
    )
}

export default Project;
