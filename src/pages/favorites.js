import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

// import query
import { GET_MY_FAVORITES } from '../gql/query';

// import custom components
import NoteFeed from '../components/NoteFeed';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  return (
    <React.Fragment>
      {/* if loading, display loading message */}
      {loading && <p>Loading...</p>}
      {/* if error, display error message */}
      {error && <p>{`Error! ${error.message}`}</p>}
      {/* check to see if data object is defined. if so, check for user favorites */}
      {data && data.me.favorites.length > 0 ? (
        <NoteFeed data={data.me.favorites} />
      ) : (
        <p>No favorites!</p>
      )}
    </React.Fragment>
  );
};

export default Favorites;
