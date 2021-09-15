import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProject from '../../hooks/useProject';

function Project() {
    const { id } = useParams();
    const [column, setColumn] = useState([]);
    const { getSingleProject } = useProject();
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
       const fetchData = async () => {
            const { columns } = await getSingleProject(id);
            setColumn(columns);
       }
       fetchData();
    }, []);

    const addRow = () => {
        const defaultRow = {
            title: '',
            startDate: '',
            endDate: '',
            ...column.reduce((acc, item) => {
                acc = { ...acc, [item.split(' ').join('')]: ''};
                return acc;
            }, {})
        };

        setRowData([...rowData, defaultRow]);
    };

    return (
        <Container className="mt-20">
            <Button className="mb-20" onClick={addRow}>Add Row</Button>
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%'}}>
                <AgGridReact rowData={rowData}>
                    <AgGridColumn headerName="PHASE TITLE" editable field="title"></AgGridColumn>
                    <AgGridColumn headerName="START DATE" editable field="startDate"></AgGridColumn>
                    <AgGridColumn headerName="END DATE" editable field="endDate"></AgGridColumn>
                    {column.map((name) => (
                        <AgGridColumn headerName={name} editable field={name.split(' ').join('')}></AgGridColumn>
                    ))}
                </AgGridReact>
            </div>
        </Container>
    )
}

export default Project;
