import 'cypress-watch-and-reload/support';
import './commands';
import * as cypressDriver from '../../test/drivers/cypress';

global.driver = cypressDriver;
