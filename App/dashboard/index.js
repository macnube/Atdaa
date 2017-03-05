import * as actions from './actions';
import { default as DashboardContainer } from './components/DashboardContainer';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors'

console.log("These are actions from dashboard index.js", actions);

export default { actions, DashboardContainer, constants, reducer, selectors };