import React from 'react';
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './css/index.css';
import NameInput from './nameInput';
// ========================================

const App = () => {
    return (
      <div className='bg-main'>
        <Routes>
          <Route exact path="/" element={<NameInput />} />
        </Routes>
      </div>
    );
   };

export default App;