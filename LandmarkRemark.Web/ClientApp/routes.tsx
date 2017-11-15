import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LandmarkRemark } from './components/LandmarkRemark';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/LandmarkRemark' component={LandmarkRemark} />
</Layout>;
