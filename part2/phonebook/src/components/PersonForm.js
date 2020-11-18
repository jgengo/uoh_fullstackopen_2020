import React from 'react'


const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>name: <input value={props.newName} onChange={props.handleChangeName} /></div>
            <div>number: <input value={props.newNumber} onChange={props.handleChangeNumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm;