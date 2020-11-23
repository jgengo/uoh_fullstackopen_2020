import React from 'react'

const Persons = ({persons, handleDestroy}) => {
    return (
        <ul>
            {persons.map( person => <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDestroy(person.id)}>delete</button></li>)}
        </ul>
    )
    
}

export default Persons