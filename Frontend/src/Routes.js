import * as React from 'react';
import {useState} from 'react';
import HomePage from './HomePage';
import SignIn from './modules/views/SignIn';
import SignUp from './modules/views/SignUp';
import withRoot from './modules/withRoot';
import Items from './Items';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Index() {
  const [ user, setLoginUser] = useState({})

  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage data={user}/>} />
        <Route path="/signIn" element={<SignIn setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<SignUp setLoginUser={setLoginUser} />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </Router>
    
    
  );
}

export default withRoot(Index);
