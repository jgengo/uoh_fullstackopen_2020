

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const voteFor = (id) => {
  return  {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const initAnecdote = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      console.log('coucou tu veux voir ma bite')
      return action.data
    case 'VOTE':
      const anecdote = state.find( anecdote => anecdote.id === action.data.id )
      if (anecdote) {
        const newAnecdote = { ...anecdote, votes: anecdote.votes + 1}
        return state.map( anecdote => anecdote.id !== action.data.id ? anecdote : newAnecdote )
      }
    return state
    case 'NEW_ANECDOTE':
      return [ ...state, action.data]

    default:
      return state 
  }
}

export default anecdoteReducer