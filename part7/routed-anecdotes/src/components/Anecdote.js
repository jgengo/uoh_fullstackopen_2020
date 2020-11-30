import React from 'react'

const Anecdote = ({anecdote}) => {
  console.log(anecdote)
  if (anecdote) {
    return (
      <div>
        <h3><em>"{anecdote.content}"</em> by {anecdote.author}</h3>
        <p>has {anecdote.votes} votes</p>
        <p>for more information see {anecdote.info}</p>
      </div>
    )
  } else {
    return null
  }

}
export default Anecdote