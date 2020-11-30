import anecdoteService from '../services/anecdotes'

export const voteFor = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    anecdote.votes += 1
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }

}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const anecdote = state.find( anecdote => anecdote.id === action.data.id )
      if (anecdote) {
        return state.map( anecdote => anecdote.id !== action.data.id ? anecdote : action.data )
      }
    return state
    case 'NEW_ANECDOTE':
      return [ ...state, action.data]

    default:
      return state 
  }
}

export default anecdoteReducer