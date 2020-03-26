import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import {
  useQuery,
} from 'urql';
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '0.5em'
  },
  avatar: {
    marginTop: '0.5em',
    marginLeft: '0.5em',
  }
});

const MessagesQuery = gql`
query {
  messages {
    id
    user
    content
  }
}
`;

export default () => {
  const classes = useStyles();

  const [result, reexecuteQuery] = useQuery({
    query: MessagesQuery,
  });

  useEffect(() => {
    window.setInterval(() => reexecuteQuery({ requestPolicy: 'network-only' }), 200);
  }, []);

  const { data } = result;

  if (!data) return <p>Loading...</p>;
  return (
    <>
      {
        data.messages.map(({ id, user, content }) => (
          <Card key={id} className={classes.root}>
            <CardMedia>
              <Avatar className={classes.avatar}>{user}</Avatar>
            </CardMedia>
            <CardContent>
              <Typography variant="h5">{content}</Typography>
            </CardContent>
          </Card>
        ))
      }
    </>
  );
};
