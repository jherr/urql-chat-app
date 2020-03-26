import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
  Client,
  defaultExchanges,
  subscriptionExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  Container,
  CssBaseline,
} from '@material-ui/core';

import Messages from './Messages';
import PostMessage from './PostMessage';

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:4000",
  {
    reconnect: true,
  }
);

const client = new Client({
  url: 'http://localhost:4000',
  exchanges: [
    devtoolsExchange,
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
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