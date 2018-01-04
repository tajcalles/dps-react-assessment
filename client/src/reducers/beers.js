export const beers = (state = [], action) => {
  switch (action.type) {
    case 'BEERS':
      return action.beers;
    case 'DELETE_BEERS':
      return state.filter( a => a.id !== action.id )
    default:
      return state;
  }
}
export default beers;
