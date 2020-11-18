import React from 'react'

const Filter = ({value, onChange}) => {
    return (
        <div>
            filter shown with: 
            <input style={{marginLeft: 0.5 + 'em'}} value={value} onChange={onChange} />
        </div>
    )
}



export default Filter;