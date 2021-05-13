import React from 'react';

const isReadyRef = React.createRef();

const navigationRef = React.createRef();

const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};


export default {
  isReadyRef,
  navigationRef,
  navigate
};

