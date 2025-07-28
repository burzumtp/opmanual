import React from 'react'
import { useParams } from 'react-router-dom'
const SideDocs = () => {
    const params=useParams()
  return (
    
    <div>this is a side docs test {params.id}</div>
  )
}

export default SideDocs