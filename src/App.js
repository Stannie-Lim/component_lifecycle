import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { getThings, getCategories } from './store/store';

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
  async componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <ul>
        {this.props.categories.map(category => <Category category={category} />)}
      </ul>
    );
  } 
}

const mapStateToProps = (state) => {
  return {
    things: state.things,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(getThings());
      dispatch(getCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);