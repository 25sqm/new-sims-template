// THINKING OF DEPRECATING THIS MODULE
// SINCE I THOUGHT IT WOULD BE BETTER TO CONSOLIDATE ALL DATA INTO A SINGLE TABLE ENTRY 
// IN TABLELISTER.TSX 

// FOR NOW THIS WILL LIVE HERE

import React, { useState, useEffect } from 'react'
import { Table, Paper } from '@mantine/core';

interface TableViewProps {
    linkData: {
        incidentID: string,
        dateTime: string,
        area: string,
        pest: string,
        pestCount: string,
        threshold: string,
    },
}

export function TableView({ linkData }: TableViewProps) {
    const [renderData, setRender] = useState({
        incidentID: '',
        dateTime: '',
        area: '',
        pest: '',
        pestCount: '',
        threshold: '',
    });

    useEffect(() => {
        setRender({
            incidentID: linkData.incidentID,
            dateTime: linkData.dateTime,
            area: linkData.area,
            pest: linkData.pest,
            pestCount: linkData.pestCount,
            threshold: linkData.threshold,
        })
    }, []);


  return (
      <>
          <Table highlightOnHover sx={{marginTop: 20}}>
            <thead>
                <tr>
                <th>Incident ID</th>
                <th>Date and Time</th>
                <th>Area</th>
                <th>Pest</th>
                <th>Pest Count</th>
                <th>Threshold</th>
                </tr>
            </thead>
            <tbody>
                        <tr key={renderData.incidentID}>
                        <td>{renderData.incidentID}</td>
                        <td>{renderData.dateTime}</td>
                        <td>{renderData.area}</td>
                        <td>{renderData.pest}</td>
                        <td>{renderData.pestCount}</td>
                        <td>{renderData.threshold}</td>
                    </tr>
            </tbody>
            </Table>
      </>
  )
}