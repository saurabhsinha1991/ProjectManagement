import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProject from '../../hooks/useProject';

function Project() {
    const { id } = useParams();
    const [column, setColumn] = useState([]);
    const { getSingleProject } = useProject();

    const rowData = [];

    useEffect(() => {
       const fetchData = async () => {
            const { columns } = await getSingleProject(id);
            setColumn(columns);
       }
       fetchData();
    }, []);

    return (
        <Container className="mt-20">
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%'}}>
                <AgGridReact rowData={rowData}>
                    <AgGridColumn headerName="PHASE TITLE" field="title"></AgGridColumn>
                    <AgGridColumn headerName="START DATE" field="startDate"></AgGridColumn>
                    <AgGridColumn headerName="END DATE" field="endDate"></AgGridColumn>
                    {column.map((name) => (
                        <AgGridColumn headerName={name} field={name.split(' ').join('')}></AgGridColumn>
                    ))}
                </AgGridReact>
            </div>
        </Container>
    )
}

export default Project;
