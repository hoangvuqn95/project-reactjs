import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListingPage from './pages/ListingPage';

ProductFeatures.propTypes = {};

function ProductFeatures(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={ListingPage} />

        <Route path={`${match.path}/:productId`} component={DetailPage} />

        <Route path={`${match.path}/:!productId`} component={NotFound} />
      </Switch>
    </div>
  );
}

export default ProductFeatures;
