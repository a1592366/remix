import uuid from 'uuid';
import * as ViewNativeSupport from './runtime/Support/ViewNativeSupport';

export default function (route, element = null) {
  const view = {
    id: uuid.v4(),
    route,
  }

  if (typeof Page === 'function') {
    Page({
      data: { type: null, element },
      onLoad (query) {
        ViewNativeSupport.Subscriber.on(
          `${ViewNativeSupport.Data}.${view.id}`, 
          (id, element) => {
            
            if (id === view.id) {
              this.setData({ type: 'SYNC', element })
            }
        });

        ViewNativeSupport.Publisher.Load({ ...view, query });
      },
      onShow () {
        ViewNativeSupport.Publisher.Show(view);
      },
      onUnload () {
        ViewNativeSupport.Subscriber.off(`${ViewNativeSupport.Data}.${view.id}`);
      }
    })
  } else {
    throw new Error('请在微信小程序环境下运行');
  }
}
