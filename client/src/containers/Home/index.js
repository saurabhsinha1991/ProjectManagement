import React from 'react';
import { Container } from 'react-bootstrap';
import ProjectForm from '../../components/ProjectForm';
import ProjectTable from '../../components/ProjectTable';
import ProjectTimeline from '../../components/ProjectTimeline';

function Home() {
    return (
        <Container>
            <div className="mb-20">
                <ProjectForm />
            </div>
            <div className="mb-20">
                <ProjectTable />
            </div>
            <div className="mb-20">
                <ProjectTimeline />
            </div>
        </Container>
    )
}

export default Home;
