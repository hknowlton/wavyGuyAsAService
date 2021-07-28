import React from 'react';
import { Route } from 'react-router-dom';

import { Home as Component } from './component';

export function Home() {
  return <Route exact path="/" component={Component} />;
}
