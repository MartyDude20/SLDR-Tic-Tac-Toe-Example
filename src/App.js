import React from 'react';
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './css/index.css';
import NameInput from './nameInput';
// ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<NameInput />);

const App = () => {
    return (
      <div className='bg-main'>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<NameInput />} />
          {/* <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} /> */}
        </Routes>
      </div>
    );
   };

export default App;