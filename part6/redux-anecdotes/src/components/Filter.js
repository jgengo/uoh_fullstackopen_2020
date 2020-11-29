import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter, resetFilter } from '../reducers/filterReducer'


const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const content = event.target.value

    if (content === "")
      dispatch(resetFilter())
    else 
      dispatch(updateFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter