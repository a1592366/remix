import ApplicationTransport from './ApplicationTransport';
import ViewControllerTransport from './ViewControllerTransport';

export * from './types';
export default {
  app: new ApplicationTransport(),
  view: new ViewControllerTransport(),
  api: null
}