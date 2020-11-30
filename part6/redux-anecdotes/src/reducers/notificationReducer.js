
const initialState = {
  content: null
}

export const createNotification = (content, seconds=5) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content }
    })
    setTimeout(() => dispatch({type: 'RESET'}), seconds * 1000)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { content: action.data.content }
    case 'RESET':
      return initialState
    default: return state 
  }
}

export default reducer