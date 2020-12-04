const initialState = {
  username: null,
  token: null,
  name: null
}


export const setUser = (data) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: data
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({type: 'RESET_USER'})
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'RESET_USER':
      return initialState
    default: return state
  }
}

export default reducer