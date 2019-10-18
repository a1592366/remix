import Tunnel from '../tunnel';
import { VIEW } from './types';

export default class ViewControllerEngine  extends Tunnel {
  onload (...argv) {
    this.emit(VIEW.LOAD, argv);
  }

  on (...argv) {
    super.on(APPLICATION, ...argv)
  }

  off (...argv) {
    super.off(APPLICATION, ...argv)
  }
}