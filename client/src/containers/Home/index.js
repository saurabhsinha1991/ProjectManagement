import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import useProject from '../../hooks/useProject';
import moment from 'moment';
import AddProject from '../../components/AddProject';
import { Link } from 'react-router-dom';

function Home() {
    const { projects, fetchProjects, deleteProject } = useProject();
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleClose = (fetchNew = false) => {
        setShow(false);
        if (fetchNew) {
            fetchProjects();
        }
    }
    const handleShow = () => setShow(true);

    const handleDelete = async (id) => {
        await deleteProject(id);
    }

    return (
        <Container>
            <div className="d-flex flex-wrap mt-20">
                {projects.map((project, i) => (
                    <div className="pd-20" key={i}>
                        <Card style={{ width: '18rem', marginBottom: 20 }}>
                            <Card.Header>
                                <Button variant="secondary" onClick={() => handleDelete(project._id)}>Delete Project</Button>
                            </Card.Header>
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
                                <Card.Text>
                                    Columns displayed:
                                </Card.Text>
                                    <ul>
                                        {project.columns.map((item, k) => (
                                            <li key={k}>{item}</li>
                                        ))}
                                    </ul>
                                <Link to={`/project/${project._id}`} variant="primary">Get Details</Link>
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

            {show && (<AddProject show={show} handleClose={handleClose} />)}
        </Container>
    )
}

export default Home;
