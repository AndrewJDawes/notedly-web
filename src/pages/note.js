import React from 'react';
// import GraphQL dependencies
import { useQuery } from '@apollo/client';

// import queries
import { GET_NOTE } from '../gql/query';

// import the Note component
import Note from '../components/Note';

const NotePage = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error! Note not found</p>;

  return <Note note={data.note} />;
};

export default NotePage;
