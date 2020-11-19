import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then( (res) => {
        setPersons(res.data)
      })

  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter( p => p.name === newName).length > 0) {
      return window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, {name: newName, number: newNumber}])
      setNewName('')
      setNewNumber('')
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
    e.target.value.length > 0 ? setShowAll(false) : setShowAll(true)
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App