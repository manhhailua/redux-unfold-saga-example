import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'redux-starter-kit';

import { fetchRepoContributors, fetchRepoInfo } from './actions';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fullName: PropTypes.string,
    stargazersCount: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => undefined,
    fullName: '',
    stargazersCount: 0,
  };

  state = {
    contributors: [],
    isLoading: false,
  };

  componentDidMount() {
    // This action invoke the saga to fetch then store data
    // to redux
    this.props.dispatch(fetchRepoInfo());
    // This action invoke the saga to fetch the data then
    // store data to component's local state. It also trigger
    // change on loading state. No redux needed.
    this.props.dispatch(
      fetchRepoContributors(
        {},
        {
          onBegan: () => {
            this.setState({ isLoading: true });
          },
          onSuccess: data => {
            this.setState({ contributors: data });
          },
          onFinished: () => {
            this.setState({ isLoading: false });
          },
        },
      ),
    );
  }

  renderHeader = () => (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://github.com/manhhailua/redux-unfold-saga#getting-started"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn redux-unfold-saga
      </a>
    </header>
  );

  renderContent = () => (
    <div className="App-content">
      <h1>Repo: {this.props.fullName}</h1>
      <h2>Stars: {this.props.stargazersCount}</h2>
      <ol>
        {this.state.contributors.map(contributor => (
          <li>{contributor.login}</li>
        ))}
      </ol>
    </div>
  );

  render() {
    const { contributors, isLoading } = this.state;
    return (
      <div className="App">
        {this.renderHeader()}
        {isLoading === true && (
          <div className="App-content">
            <h1>Loading...</h1>
          </div>
        )}
        {contributors.length > 0 && this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  ['repo.full_name', 'repo.stargazers_count'],
  (fullName, stargazersCount) => ({ fullName, stargazersCount }),
);

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
