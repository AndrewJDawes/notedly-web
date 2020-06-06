import React from 'react';
import { useQuery } from '@apollo/client';

// import queries
import { GET_NOTES } from '../gql/query';

// import custom components
import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an error
  if (error) return <p>Error!</p>;

  // if there are no notes, return a message
  if (!data.noteFeed.notes.length > 0) return <p>No notes yet!</p>;
  // if the data is successful, display the data in our UI
  return (
    // add a <React.Fragment> element to provide a parent element
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* Only display the Load More button if hasNextPage is true */}
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // combine the new results and the old
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
