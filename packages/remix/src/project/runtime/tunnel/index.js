import Native from './Native';
import Net from './Net';

const Tunnel = process.env.IS_INSPECT_MODE ? 
    Net : Native;

export default Tunnel;

