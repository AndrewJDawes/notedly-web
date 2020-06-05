import React from 'react';
import styled from 'styled-components';

// import custom components
import Header from './Header';
import Navigation from './Navigation';

// component styles
const Wrapper = styled.div`
  /* we can apply media query styles within the styled component */
  /* this will only apply the layout for screens above 700px wide */
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

// Removed following style: padding: 1em;
// Was causing to overflow page: https://stackoverflow.com/questions/13504412/page-extends-past-edge-of-screen
const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  overflow-y: scroll;
  /* Again apply media query styles to screens above 700px */
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};
export default Layout;
