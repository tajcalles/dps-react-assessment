import React from 'react';
import { connect } from 'react-redux';
import { getBeers } from '../actions/beers';
import {
  Container,
  Grid,
  Header,
  Card,
  Image,
  Divider,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Beers extends React.Component {

  componentDidMount() {
    this.props.dispatch(getBeers(this.setLoaded))
  }

  beers = () => {
    return( beer =>
      <Card key={beer.id}>
        <Image />
        <Card.Content>
          <Card.Header>
            {beer.name}
          </Card.Header>
          <Card.Meta>
            <span>beer info</span>
          </Card.Meta>
          <Card.Description>
            this one is delish fam
          </Card.Description>
          <Card.Content extra>
            <Link to={`/beers/${beer.id}`}>
              View Beer
            </Link>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }

  render() {
    return (
      <Container>
        <Header as="h3" textAlign="center">Beers</Header>
        <Divider />
        <Card.Group itemsPerRow={4}>
          { this.beers() }
        </Card.Group>
      </Container>
    )
  }
}

export default connect()(Beers);
