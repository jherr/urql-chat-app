import React from 'react';
import gql from 'graphql-tag';
import {
  useSubscription,
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

const MessagesSubscription = gql`
subscription {
  messages {
    id
    user
    content
  }
}
`;

export default () => {
  const classes = useStyles();

  const [result] = useSubscription({
    query: MessagesSubscription,
  });

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
