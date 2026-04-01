import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';

try {
  const html = renderToString(React.createElement(App));
  console.log("SUCCESS");
} catch (e) {
  console.error("ERROR CAUGHT:");
  console.error(e.message);
  if (e.stack) console.error(e.stack);
}
