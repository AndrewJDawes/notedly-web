import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

// import query
import { GET_MY_NOTES } from '../gql/query';

// import custom components
import NoteFeed from '../components/NoteFeed';

const MyNotes = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'My Notes - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  return (
    <React.Fragment>
      {/* if loading, return loading message */}
      {loading && <p>Loading...</p>}
      {/* if error, return loading message */}
      {error && <p>{`Error! ${error.message}`}</p>}
      {data && data.me.notes.length > 0 ? (
        <NoteFeed notes={data.me.notes} />
      ) : (
        <p>No notes yet!</p>
      )}
    </React.Fragment>
  );
};

export default MyNotes;
