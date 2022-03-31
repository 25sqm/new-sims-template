import React from 'react'
import { Tabs } from '@mantine/core';
import TableLister from './TableLister'

interface TabProps {
    data: Array<Object>,
}




const FindingsTabView = ({ data }: TabProps) => {

  return (
    <Tabs>
          {data.map((item: any) => (
            <Tabs.Tab key={item.label} label={item.label}><TableLister data={item.findings}/></Tabs.Tab>
          ))}
    </Tabs>
  )
}

export default FindingsTabView