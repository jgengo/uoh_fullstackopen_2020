import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)
  const dispatch = useDispatch() 


  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(createNotification(`you voted for '${content}'`, 10))
  }

  return (
    <div>
      {anecdotes
        .sort((x, y) => y.votes - x.votes)
        .filter( (anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList