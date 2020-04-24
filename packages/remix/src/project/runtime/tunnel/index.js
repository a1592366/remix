import NativeTunnel from './NativeTunnel';
import SocketTunnel from './SocketTunnel';

const Tunnel = process.env.IS_INSPECT_MODE ? SocketTunnel : NativeTunnel;

export default Tunnel;

