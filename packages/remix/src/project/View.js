import uuid from 'uuid';
import * as ViewNativeSupport from './runtime/Support/ViewNativeSupport';

export default function (route) {
  const view = {
    id: uuid.v4(),
    route,
  }

  if (typeof Page === 'function') {
    Page({
      data: { element: null },
      onLoad (query) {
        ViewNativeSupport.Publisher.Load({ ...view, query }, (element) => {
          this.setData({ element });
        });
      }
    })
  } else {
    throw new Error('请在微信小程序环境下运行');
  }
}
