import React from 'react'

import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {


  const vote = (id, content) => {
    props.voteFor(id)
    props.createNotification(`you voted for '${content}'`, 10)
  }

  return (
    <div>
      {props.anecdotes
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

const mapDispatchToProps = {
  voteFor,
  createNotification,
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state
      .anecdotes.sort((x, y) => y.votes - x.votes)
      .filter( (anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList