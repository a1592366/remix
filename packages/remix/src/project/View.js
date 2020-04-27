import uuid from 'uuid';
import * as ViewNativeSupport from './runtime/Support/ViewNativeSupport';
import { INTERNAL_RELATIVE_KEY } from '../shared';

export default function (route) {
  const view = {
    id: uuid.v4(),
    route,
  }

  if (typeof Page === 'function') {
    let onData = null;

    Page({
      data: { element: null },
      onLoad (query) {
        onData = (element) => {
          const id = element[INTERNAL_RELATIVE_KEY];
          console.log(id, view.id);

          if (id === view.id) {
            console.log(element);
            this.setData({ element });
          }
        }

        console.log('onLoad')

        ViewNativeSupport.Subscriber.onData(onData);
        ViewNativeSupport.Publisher.Load({ ...view, query });
      },
      onShow () {
        ViewNativeSupport.Publisher.Show(view);
      },
      onUnload () {
        ViewNativeSupport.Subscriber.unsubscribe(
          ViewNativeSupport.Data, 
          onData
        )
      }
    })
  } else {
    throw new Error('请在微信小程序环境下运行');
  }
}
