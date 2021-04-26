import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import Navigator from '_navigations';

const App = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Navigator />
  </ApplicationProvider>
);

export default App;
