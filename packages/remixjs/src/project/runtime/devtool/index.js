import uuid from 'uuid';
import qs from 'qs';
import transports from '../transports';
import ViewManager from '../ViewManager';
import env from '../../../../env';


class DevTool {
  constructor (context, instance) {
    this.id = uuid.v4();
    this.context = context;
    this.instance = instance;
    this.viewManager = new ViewManager(context);

    transports.app.onLaunch(this.onApplicationLaunch);
  }
  
  onApplicationLaunch (options) {
    debugger;
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

export default function (context) {
  const devTool = new DevTool(context);


  devTool.run();
}  

