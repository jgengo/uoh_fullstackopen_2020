import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import anecdoteService from './services/anecdotes'
import { initAnecdote } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    anecdoteService.getAll().then( (anecdotes) => {
      dispatch(initAnecdote(anecdotes))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />

    </div>
  )
}

export default App