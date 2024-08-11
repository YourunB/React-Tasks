'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import ErrorBoundary from '../../app/modules/errorBoundary';

const ReduxProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        {children}
      </Provider>
    </ErrorBoundary>
  );
};

export default ReduxProviderWrapper;