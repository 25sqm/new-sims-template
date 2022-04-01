import React from 'react'
import { Tabs, Table, Text, Paper, ScrollArea } from '@mantine/core';

interface TabProps {
    data: Array<Object>,
}

interface TableProps {
  tableData: Array<Object>,
}

const FindingsTable = ({ tableData }: TableProps) => {
  const tableBody = (areaFindings: Object[]) => {
    return (
      <>
    <Table striped highlightOnHover my="md">
      <thead>
      <tr>
          <th></th>
          <th>SO#</th>
          <th>Ref#</th>
          <th>Findings</th>
          <th>Proposed Action</th>
          <th>Action Taken</th>
          <th>Person In-Charge</th>
          <th>Date</th>
        </tr>
      </thead>
          <tbody>
            {areaFindings.map((entry: any) => (
              <tr>
                <td></td>
                <td>{entry.serviceOrder}</td>
                <td>{entry.refNumber}</td>
                <td>{entry.findings}</td>
                <td>{entry.proposed}</td>
                <td>{entry.actionTaken}</td>
                <td>{entry.personInCharge}</td>
                <td>{entry.date}</td>
              </tr>
        ))}
      </tbody>
    </Table>
    </>
    )
  }
  const tableList = tableData.map((finding: any) => 
    (<>
      <Text weight={500}>{finding.area}</Text>
      {tableBody(finding.areaFindings)}
    </>)
  )
  return (
    <Paper p="md">
      {tableList}
    </Paper>
  )
}


const FindingsTabView = ({ data }: TabProps) => {
  return (
    <Tabs>
          
          {data.map((item: any) => (
            <Tabs.Tab key={item.label} label={item.label} >
              <ScrollArea sx={{ height: '59vh' }}>
                <FindingsTable tableData={item.findings} />
                </ScrollArea>
            </Tabs.Tab>
          ))}
    </Tabs>
  )
}

export default FindingsTabView