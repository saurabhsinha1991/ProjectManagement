import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import useProject from '../hooks/useProject';

function AddProject(props) {
    const { show, handleClose } = props;
    const [projectName, setProjectName] = useState('');
    const [managerName, setManagerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentColumnText, setColumnText] = useState('');
    const [columns, setColumns] = useState([]);

    const { addProject } = useProject();

    const addProjectData = async () => {
        const response = await addProject({
            projectName,
            managerName,
            startDate,
            endDate,
            columns,
        });
        if (!response.error) {
            handleClose(true);
        }
    }

    const addColumn = () => {
        setColumns([ ...columns, currentColumnText ]);
        setColumnText('');
    };

    const removeColumn = (e, index) => {
        e.preventDefault();
        setColumns(columns.filter((_, i) => i !== index));
    };

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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup className="mb-2">
                            <Form.Control
                                value={currentColumnText}
                                type="text"
                                placeholder="Enter Column Name"
                                onChange={(e) => setColumnText(e.target.value)}
                            />
                            <InputGroup.Text onClick={addColumn}>+</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <ul>
                        {columns.map((item, i) => (
                            <li>{item} <a href="/" onClick={(e) => removeColumn(e, i)}>Remove</a></li>
                        ))}
                    </ul>
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
