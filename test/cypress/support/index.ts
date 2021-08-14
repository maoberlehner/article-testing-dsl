import 'cypress-watch-and-reload/support';
import './commands';
import * as cypressDriver from '../driver';

global.driver = cypressDriver;
