const beers = (state = [], action) => {
  switch(action.type) {
    case 'SET_BEERS':
      return action.beers
    case 'MORE_BEERS':
      return [...state, ...action.beers]
    default:
      return state;
  }
}

export default beers;
