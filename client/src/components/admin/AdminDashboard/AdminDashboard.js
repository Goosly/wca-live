import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CompetitionList from '../../CompetitionList/CompetitionList';
import ImportableCompetitions from '../ImportableCompetitions/ImportableCompetitions';
import useApolloErrorHandler from '../../../hooks/useApolloErrorHandler';

const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`;

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 64,
    width: 64,
  },
  fullWidth: {
    width: '100%',
  },
}));

function AdminDashboard({ currentUser }) {
  const classes = useStyles();
  const apolloErrorHandler = useApolloErrorHandler();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const [signOut, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: (data) => {
      apolloClient.clearStore().then(() => history.push('/'));
    },
    onError: apolloErrorHandler,
  });
  const { name, avatar, staffMembers } = currentUser;

  const staffedCompetitions = staffMembers.map(
    (staffMember) => staffMember.competition
  );

  return (
    <Box p={3}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Avatar src={avatar.thumbUrl} className={classes.avatar} />
        </Grid>
        <Grid item>
          <Typography variant="h5">Hello, {name}!</Typography>
        </Grid>
        <Grid item className={classes.fullWidth}>
          <Paper>
            <CompetitionList
              title="Staffed competitions"
              competitions={staffedCompetitions}
              pathPrefix="/admin"
            />
          </Paper>
        </Grid>
        <Grid item className={classes.fullWidth}>
          <ImportableCompetitions />
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={signOut} disabled={loading}>
                Sign out
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/"
              >
                Home
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
