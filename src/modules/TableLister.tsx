import React, {useEffect} from 'react'

interface TableProps {
  data: Array<Object>,
}

const TableLister = ({ data }: TableProps) => {
  useEffect(() => {
    console.log(data)
  }, [])

  
  return (
    <div>TableLister</div>
  )
}

export default TableLister