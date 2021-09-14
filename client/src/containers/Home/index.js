import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import useProject from '../../hooks/useProject';
import moment from 'moment';
import AddProject from '../../components/AddProject';

function Home() {
    const { projects, fetchProjects } = useProject();
    const [show, setShow] = useState(false);

    const handleClose = (fetchNew = false) => {
        setShow(false);
        if (fetchNew) {
            fetchProjects();
        }
    }
    const handleShow = () => setShow(true);

    return (
        <Container>
            <div className="d-flex flex-wrap mt-20">
                {projects.map((project) => (
                    <div className="pd-20">
                        <Card style={{ width: '18rem', marginBottom: 20 }}>
                            <Card.Body>
                                <Card.Title>{project.projectName}</Card.Title>
                                <Card.Text>
                                    {project.managerName}
                                </Card.Text>
                                <Card.Text>
                                    Start Date: {`${moment(project.startDate).format('DD MMM YYYY')}`}
                                </Card.Text>
                                <Card.Text>
                                    End Date: {`${moment(project.endDate).format('DD MMM YYYY')}`}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
                <div className="pd-20">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Add Project</Card.Title>
                            <div className="text-center">
                                <Button className="add-btn" onClick={handleShow}>
                                    +
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <AddProject show={show} handleClose={handleClose} />
        </Container>
    )
}

export default Home;
