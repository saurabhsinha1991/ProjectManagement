import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useProject from '../hooks/useProject';

function AddProject(props) {
    const { show, handleClose } = props;
    const [projectName, setProjectName] = useState('');
    const [managerName, setManagerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { addProject } = useProject();

    const addProjectData = async () => {
        const response = await addProject({
            projectName,
            managerName,
            startDate,
            endDate
        });
        if (!response.error) {
            handleClose(true);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            value={projectName}
                            type="text"
                            placeholder="Enter Project Name"
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Manager Name</Form.Label>
                        <Form.Control
                            value={managerName}
                            type="text"
                            placeholder="Enter Project Name"
                            onChange={(e) => setManagerName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Start Date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={addProjectData}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddProject;
