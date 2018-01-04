import React from 'react';
import { connect } from 'react-redux';
import { Divider, Header, Image, Container, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const BeerView = ({ beer = {} }) => (
  <Container>
    <Link to="/beers">View All Beers</Link>
    <Header as="h3" textAlign="center">{beer.name}</Header>
    <Image src={beer.logo} />
    <Table definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Description</Table.Cell>
          <Table.Cell>{beer.description}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>ABV</Table.Cell>
          <Table.Cell>{beer.abv}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>IBU</Table.Cell>
          <Table.Cell>{beer.ibu}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
)

const mapStateToProps = (state, props) => {
  return { beer: state.beers.find( b => b.id === parseInt(props.match.params.id )) }
}

export default connect(mapStateToProps)(BeerView);
