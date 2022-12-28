import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Game from './game';
import NameInput from './nameInput';
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NameInput />);
