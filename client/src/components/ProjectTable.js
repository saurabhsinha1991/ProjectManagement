import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React from 'react';

function ProjectTable() {
    const rowData = [
        {title: "Toyota", startDate: "Celica", endDate: 35000},
        {title: "Ford", startDate: "Mondeo", endDate: 32000},
        {title: "Porsche", startDate: "Boxter", endDate: 72000}
    ];
 
    return (
        <div className="ag-theme-alpine" style={{
            height: 400, width: 600
        }}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn headerName="PHASE TITLE" editable field="title"></AgGridColumn>
                <AgGridColumn headerName="START DATE" editable field="startDate"></AgGridColumn>
                <AgGridColumn headerName="END DATE" editable field="endDate"></AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default ProjectTable;
