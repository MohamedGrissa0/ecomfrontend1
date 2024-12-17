// src/redux/reduxWrapper.js
import { Provider } from 'react-redux';
import { store } from './store';
import { createWrapper } from 'next-redux-wrapper';

// Create a wrapper to wrap the app with Redux Provider
export const wrapper = createWrapper(() => store);

export const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
