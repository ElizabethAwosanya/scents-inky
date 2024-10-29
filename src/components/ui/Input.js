// src/components/ui/Input.js
import React from 'react';

const Input = (props) => (
  <input
    {...props}
    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
  />
);

export default Input;