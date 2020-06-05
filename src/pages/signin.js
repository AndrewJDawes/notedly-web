import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

// import mutation
import { SIGNIN_USER } from '../gql/mutation';

import UserForm from '../components/UserForm';

const SignIn = props => {
  useEffect(() => {
    //upate the document title
    document.title = 'Sign In - Notedly';
  });

  const [signIn, { loading, error, client }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signIn);
      // update the local cache
      client.writeData({ data: { isLoggedIn: true } });
      // redirect the user to the homepage
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {/* if the data is loading, display a loading message */}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display an error message */}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
