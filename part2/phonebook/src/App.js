import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons'

import './index.css'


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorType, setErrorType ] = useState(null)

  const notify = (message, type) => {
    setErrorMessage(message)
    setErrorType(type)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 5000)
  }

  const Flash = ({message, type}) => {
    if (message === null) {
      return null
    }

    return (
      <div className={type}>
        <p>{message}</p>
      </div>
    )

  }

  useEffect( () => {
    personService
      .getAll()
      .then( (res) => {
        setPersons(res.data)
      })

  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '')
      return notify('make an effort, fill the form', 'error');

    const existingUser = persons.find( p => p.name === newName)
    if (existingUser) {
      if (window.confirm(`${newName} already exist in the db, wanna replace the old number by the new one?`)) {
        personService
        .update(existingUser.id, {name: newName, number: newNumber})
        .then( (res) => {
          setPersons(
            persons.map ( (person) => person.id === existingUser.id ? res.data : person)
          )
          notify(`${newName} has been updated.`, 'success');
        })

        }
      } else {
      personService
      .create({name: newName, number: newNumber})
      .then( (_res) => { 
        setPersons([...persons, {name: newName, number: newNumber}])
        setNewName('')
        setNewNumber('')
        notify("succesfully added.", "success")
      })
      .catch( (_err) => notify('error while creating this user in db', 'error') )
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
    e.target.value.length > 0 ? setShowAll(false) : setShowAll(true)
  }

  const handleDestroy = (id) => {
    personService
    .get(id)
    .then( (res) => {
      if (window.confirm(`Are you sure you wanna delete ${res.data.name}`))
      {
        personService
        .destroy(id)
        .then( () => {
          setPersons(persons.filter( (person) => person.id !== id ));
          notify('sucessfully deleted.', 'success')
        })
        .catch( (err) => {
          if (err.response) {
            if (err.response.status === 404) notify(`${res.data.name} has already been deleted.`, "error");
          } else {
            notify(`failed to delete ${res.data.name}`, 'error')
          }
        })
      }
    })
    .catch( (_noob) => {
      notify('wth are doing?', 'error')
    })
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    
    <div>
      <Flash message={errorMessage} type={errorType} />
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
      <Persons persons={personsToShow} handleDestroy={handleDestroy} />
    </div>
  )
}

export default App