import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
  Client,
} from 'urql';
import {
  Container,
  CssBaseline,
} from '@material-ui/core';

import Messages from './Messages';
import PostMessage from './PostMessage';

const client = new Client({
  url: 'http://localhost:4000'
});

const App = () => (
  <Provider value={client}>
    <Container>
      <CssBaseline />
      <Messages />
      <PostMessage />
    </Container>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));