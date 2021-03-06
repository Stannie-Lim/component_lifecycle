import axios from 'axios';
import React from 'react';

const Thing = (props) => {
  const thing = props.thing;
  return (
    <li>
      {thing.name}
    </li>
  );
};

const Category = (props) => {
  const category = props.category;
  return (
    <li>
      {category.name}
      <ul>
        {category.things.map((thing) => {
          return (
            <Thing key={thing.id} thing={thing} />
          );
        })}
      </ul>
    </li>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      things: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const thingsResponse = await axios.get('/api/things');
    const categoriesResponse = await axios.get('/api/categories');

    this.setState({ 
      things: thingsResponse.data, 
      categories: categoriesResponse.data,
    });
  }

  render() {
    return (
      <ul>
        {this.state.categories.map((category) => {
          return (
            <Category key={category.id} category={category} />
          );
        })}
      </ul>
    );
  } 
}

export default App;