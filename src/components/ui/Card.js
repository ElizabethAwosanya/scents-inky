// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children }) => (
  <div className="border rounded-lg shadow-sm">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="p-4 border-t">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);
