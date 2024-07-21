import React from 'react';

const ThemeContext = React.createContext({
  light: false,
  change: function() { this.light = !this.light },
});

export default ThemeContext;
