import uuid from 'uuid';
import transports from './transports';
import ViewManager from './ViewManager';
import Socket from './Socket';
import env from '../../../env';


class DevTool {
  constructor (context) {
    this.id = uuid.v4();
    this.context = context;
    this.viewManager = new ViewManager(context);

    this.socket = new Socket({
      url: env.inspectWSURL
    })
  }  

  run () {
    this.socket.onOpen(() => {
      this.socket.send({
        data: {
          id: this.id,
          type: env.inspectMessageTypes.REGISTER,
          terminal: env.inspectTerminalTypes.LOGIC
        }
      })
    })
  }
}  

export * from './transports/types';
export default function (context) {
  const devTool = new DevTool(context);


  devTool.run();
}  
