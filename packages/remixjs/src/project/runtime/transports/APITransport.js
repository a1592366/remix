import Tunnel from '../tunnel';
import { API } from './types';

export default class APITransport extends Tunnel {
  on (...argv) {
    super.on(APPLICATION, ...argv)
  }

  off (...argv) {
    super.off(APPLICATION, ...argv)
  }
}