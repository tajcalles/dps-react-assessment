import axios from 'axios';

export const getBeers = () => {
  return (dispatch) => {
    axios.get('/api/all_beers_path')
      .then( res => dispatch({ type: 'BEERS' , beers: res.data }) )
  }
}
