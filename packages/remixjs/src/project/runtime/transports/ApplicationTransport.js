import Tunnel from '../tunnel';
import { APPLICATION } from './types';

export default class ApplicationTransport extends Tunnel {
  launch (...argv) {
    this.emit(APPLICATION.LAUNCH, argv);
  }

  show (...argv) {
    this.emit(APPLICATION.SHOW, argv);
  }
  hide (...argv) {
    this.emit(APPLICATION.HIDE, argv);
  }

  error (...argv) {
    this.emit(APPLICATION.ERROR, argv);
  }

  on (...argv) {
    super.on(APPLICATION, ...argv)
  }

  off (...argv) {
    super.off(APPLICATION, ...argv)
  }
}