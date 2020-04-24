import uuid from 'uuid';
import qs from 'qs';
import { logicTransports } from '../transports';
import ViewManager from '../ViewManager';
import { isFunction } from '../../../shared/is';

import env from '../../../../env';

const transports = logicTransports;

class DevToolRuntime {
  constructor (context, instance) {
    this.id = uuid.v4();
    this.context = context;
    this.instance = instance;
    this.viewManager = new ViewManager(context);

    transports.app.onLaunch(this.onApplicationLaunch);
    transports.app.onDisconnect(this.onApplicationDisconnected);
  }

  onApplicationDisconnected = () => {
    top.postMessage({
      code: 'DISCONNECTED'
    })
  }
  
  onApplicationLaunch = (options) => {
    const { props } = this.instance;
    
    if (isFunction(props.onLaunch)) {
      props.onLaunch(options);
    }
  }

  run () {
    const search = location.search.slice(1);
    const query = qs.parse(search);

    transports.app.connect(query.id, (code) => {
      if (code === 'NO_EXIST') {
        
      }
    });
  }
}  

export default function (context, instance) {
  const devTool = new DevToolRuntime(context, instance);


  devTool.run();
}  

