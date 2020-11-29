
const initialState = ""

export const updateFilter = (content) => {
  return {
    type: "SET_FILTER",
    data: { content }
  }
}

export const resetFilter = () => {
  return { type: "RESET" }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.content
    case 'RESET':
      return initialState
    default: return state 
  }
}

export default reducer