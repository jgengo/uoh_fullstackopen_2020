import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ search, setSearch ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter( p => p.name === newName).length > 0) {
      return window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, {name: newName, number: newNumber}])
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    
    <div>
      <h1>Phonebook</h1>
      <Filter value={search} onChange={handleSearch} />
      <h3 style={{marginTop: 2 + "em"}}>add new number</h3>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h3 style={{marginTop: 2 + "em"}}>Contacts</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App