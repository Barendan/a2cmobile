import React from 'react';

const PreferencesContext = React.createContext({
    rtl: 'left',
    toggleRTL: () => { },
    theme: 'light',
    toggleTheme: () => { },
    language: 'en',
    setLanguage: () => { }
});

export default PreferencesContext;