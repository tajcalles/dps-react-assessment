import React from 'react';
import {
  Header,
  Segment,
  Container,
  Card,
  Grid,
  Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchBeers } from '../actions/beers';
import beerStock from '../images/beer-stock.jpg';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Beers extends React.Component {
  state = { page: 1, hasMore: true };

  componentDidMount() {
    this.props.dispatch(fetchBeers());
  }

  beerStats = (beer) => {
    return(
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8} style={{ textAlign: 'center'}}>
            ABV: { beer.abv? beer.abv : 'N/A'}
            %
          </Grid.Column>
          <Grid.Column width={8} style={{ textAlign: 'center'}}>
            IBUs: {beer.ibu? beer.ibu : 'N/A'}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  displayBeers = () => {
    return this.props.beers.map( beer => {
      return(
        <Card>
          <Card.Content>
            <Card.Header>
              {beer.name}
              <hr />
              {beer.style.name}
            </Card.Header>
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Image src={ beer.labels? beer.labels.medium : beerStock } />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Card.Description style={styles.description}>
              {beer.description}
            </Card.Description>
            <Link to ={`/beer/${beer.id}`}>
              View Details
            </Link>
          </Card.Content>
          <Card.Content extra>
            { this.beerStats(beer)}
          </Card.Content>
        </Card>
      )
    })
  }

  loadFunc = () => {
    axios.get(`/api/all_beers?page=${this.state.page + 1 }`)
      .then( res => {
        this.props.dispatch({ type: 'MORE_BEERS', beers: res.data.entries })
        this.setState({ page: this.state.page + 1, hasMore: res.data.has_more })
      })
      .catch( err => {
        console.log(err)
    });
  }

  render() {
    const { page, hasMore } = this.state;

    return(
      <Container>
        <Segment basic>
          <Header textAlign='center' as='h1' inverted>Beers</Header>
          <Segment basic>
            <InfiniteScroll
              pageStart={page}
              loadMore={this.loadFunc}
              hasMore={hasMore}
              loader={<div className="loader">Loading ...</div>}
              useWindow={false}
            >
              <Card.Group stackable itemsPerRow={3}>
                { this.displayBeers() }
              </Card.Group>
            </InfiniteScroll>
          </Segment>
        </Segment>
      </Container>
    );
  }
}
const styles = {
  description: {
    height: '200px',
    overflow: 'auto',
  }
}
const mapStateToProps = (state) => {
  return{
    beers: state.beers,
  }
}
export default connect(mapStateToProps)(Beers);
