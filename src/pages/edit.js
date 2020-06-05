import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// import the NoteForm component
import NoteForm from '../components/NoteForm';

// import query
import { GET_NOTE, GET_ME } from '../gql/query';

// import mutation
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  console.log(id);
  // define our notes query
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  // define user query
  const { data: userdata } = useQuery(GET_ME);
  // define edit mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>'Error! Note not found.'</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
