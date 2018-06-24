/**
 *
 * Asynchronously loads the component for CreateProvider
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
