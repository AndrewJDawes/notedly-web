import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

// import query
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

// import mutation
import { NEW_NOTE } from '../gql/mutation';

// import the NoteForm component
import NoteForm from '../components/NoteForm';

const NewNote = props => {
  useEffect(() => {
    // update the document title
    document.title = 'New Note - Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      // when complete, redirect the user to the note page
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <React.Fragment>
      {/* as the mutation is loading, display a loading message */}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display an error message */}
      {error && <p>Error!</p>}
      {/* the form component, passing the mutation data as a prop*/}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
