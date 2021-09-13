import React from 'react';
import { Table } from 'react-bootstrap';

function ProjectTable() {
    return (
        <Table striped bordered hover className="project-table">
            <thead>
                <tr>
                    <th></th>
                    <th colSpan="2">TIMELINE</th>
                    <th colSpan="7">PROJECT NOTES</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table-sub-header">
                    <td>PHASE TITLE</td>
                    <td>START <br/> DATE</td>
                    <td>END <br /> DATE</td>
                    <td>DURATION <br /> in days</td>
                    <td>SCHEDULE</td>
                    <td>BUDGET</td>
                    <td>RESOURCES</td>
                    <td>RISKS</td>
                    <td>ISSUES</td>
                    <td>COMMENTS</td>
                </tr>
                <tr>
                    <td>PHASE A</td>
                    <td>05/05/25</td>
                    <td>05/05/25</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default ProjectTable;
