import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import UserForm from '../components/UserForm';

// import mutation
import { SIGNUP_USER } from '../gql/mutation';

// include the props passed to the component for later use
const SignUp = props => {
  useEffect(() => {
    // update the document title
    document.title = 'Sign Up - Notedly';
  });

  // console.log(`${event.target.name}: ${event.target.value}`);
  // console.log(values);
  // useApolloClient allows us to reference the client running in browser
  // since useApolloClient is a React hook, it can only be called within the body of a function hook.
  // const client = useApolloClient();
  const [signUp, { loading, error, client }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // console.log('completed!');
      // store the token
      localStorage.setItem('token', data.signUp);
      // update the local cache
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* if the data is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message */}
      {error && <p>Error signing up!</p>}
    </React.Fragment>
  );
};
export default SignUp;
