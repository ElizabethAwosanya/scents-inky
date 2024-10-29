import React from 'react';

const Button = ({ children, ...props }) => (
  <button {...props} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    {children}
  </button>
);

export default Button;