
import React from 'react';
import Bento from '../Components/Home/Bento/Bento';
import Popular from '../Components/Home/Popular/Popular';
import New from '../Components/Home/New/New'

const HomePage = () => {
  return (
    <>
      <Bento />
      <Popular />
      <New/>
      {/* <ViewProDucts/> */}
    </>
  );
};

export default HomePage;
