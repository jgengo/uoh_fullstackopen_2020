
const initialState = {
  content: null
}

export const createNotification = (content) => {
  return {
    type: "SET_NOTIFICATION",
    data: { content }
  }
}

export const resetNotification = () => {
  return { type: "RESET" }
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