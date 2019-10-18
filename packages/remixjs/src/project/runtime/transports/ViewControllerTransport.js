import Tunnel from '../tunnel';
import { VIEW } from './types';

export default class ViewControllerEngine  extends Tunnel {
  load (...argv) {
    this.emit(VIEW.LOAD, argv);
  }

  on (...argv) {
    super.on(VIEW, ...argv)
  }

  off (...argv) {
    super.off(VIEW, ...argv)
  }
}