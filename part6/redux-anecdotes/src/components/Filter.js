import React from 'react'
import { connect } from 'react-redux'
import { updateFilter, resetFilter } from '../reducers/filterReducer'


const Filter = (props) => {

  const handleChange = (event) => {
    const content = event.target.value

    if (content === "")
      props.resetFilter()
    else 
      props.updateFilter(event.target.value)
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

const mapDispatchToProps = {
  resetFilter,
  updateFilter
}

const connectedFilter = connect( null, mapDispatchToProps)(Filter)

export default connectedFilter