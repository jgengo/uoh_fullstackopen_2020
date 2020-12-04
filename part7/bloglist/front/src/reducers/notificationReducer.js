let timer

const initialState = {
  message: null,
  type: null 
}

export const createNotification = (data, seconds=5) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: data
    })
    clearTimeout(timer)
    timer = setTimeout(() => dispatch({type: 'RESET'}), seconds * 1000)
  }
}

const reducer = (state = initialState, action) => {
  console.log('ici')
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action.data)
      return action.data
    case 'RESET':
      return initialState
    default: return state 
  }
}

export default reducer