import uuid from 'uuid';
import qs from 'qs';
import transports, { APPLICATION } from './transports';
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
    });
  }  

  run () {
    this.socket.onOpen(() => {
      const search = location.search.slice(1);
      const query = qs.parse(search);

      debugger;

      this.socket.send({
        data: {
          id: this.id,
          type: env.inspectMessageTypes.MESSAGE,
          terminal: env.inspectTerminalTypes.LOGIC,
          data: {
            type: APPLICATION.INSPECT,
            argv: [
              { id: query.id }
            ]
          }
        }
      })
    })
  }
}  

export default function (context) {
  const devTool = new DevTool(context);


  devTool.run();
}  

