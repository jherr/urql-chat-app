import React, { useState } from 'react';
import gql from 'graphql-tag';
import {
  useMutation,
} from 'urql';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';

const PostMessageMutation = gql`
mutation($user: String!, $content: String!) {
  postMessage(user: $user, content: $content)
}
`;

export default () => {
  const [state, setState] = useState({ user: 'baz', content: 'This is awesome' });
  const [postResult, executePost] = useMutation(PostMessageMutation);

  const onSend = () => {
    executePost(state);
    setState({
      ...state,
      content: '',
    });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={2}>
        <TextField
          onChange={(evt) => setState({ ...state, user: evt.target.value })}
          value={state.user}
          label="User"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          onChange={(evt) => setState({ ...state, content: evt.target.value })}
          value={state.content}
          label="Comment"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          onClick={() => onSend()}
          variant="contained"
          color="primary"
          fullWidth
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};
