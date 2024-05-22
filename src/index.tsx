import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import { store } from 'store/globalstore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the App component wrapped in the Provider component
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);