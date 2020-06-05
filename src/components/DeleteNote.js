import React from 'react';
import { useMutation } from '@apollo/client';
// if you try props.history.push() in a component that hasn't
// been added as a <Route/> to the <Router/> in index.js,
// you must use the withRouter() from react-router-dom
import { withRouter } from 'react-router-dom';

// import mutation
import { DELETE_NOTE } from '../gql/mutation';

// import queries to refresh
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

// import custom components
import ButtonAsLink from './ButtonAsLink';

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      props.history.push('/mynotes');
    }
  });

  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote);
