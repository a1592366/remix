import { transports } from 'remixjs/project';
import uuid from 'uuid';

const { assign } = Object;
const endport = `http://api.muwu.info/graphql`;

const authorizationKey = `_authorization_token_`;
const getLocalAuthorizationToken = () => {  
  const string = transports.api.getStorageSync(authorizationKey);

  if (string) {
    const data = JSON.parse(string);
    if (data.expiredAt > Date.now()) {
      authorizationToken = data;
      defaultHeaders.Authorization = `${data.type} ${data.token}`;
    } else {
      transports.api.removeStorageSync(authorizationKey);
    }
  }
}

export let authorizationToken = null;
export const getAuthorizationToken = () => new Promise((resolve, reject) => {
  getLocalAuthorizationToken();

  if (authorizationToken) {
    return resolve();
  } 

  transports.api.login()
    .then(({ code }) => {
      graphql(`
        query signIn($code: String!) {
          signIn(code: $code) {
            token
            type
            expiresIn
          }
        }
      `)({ code }).then(res => {
        const { signIn } = res.data;
        authorizationToken = signIn;
        defaultHeaders.Authorization = `${signIn.type} ${signIn.token}`;
        transports.api.setStorageSync(authorizationKey, JSON.stringify({
          ...signIn,
          expiredAt: Date.now() + signIn.expiresIn * 1000
        }));

        resolve();
      }).catch(err => {
        reject(err);
      });
    })
    .catch(err => {})
});

let isReAuthorizatting = false;
let requestQueue = [];
const handleErrors = (errors, task, reject) => {
  const isStop = errors.some(error => {
    const { extensions } = error;

    if (
      extensions.code === 'INVALID_TOKEN' ||
      extensions.code === 'EXPIRED_TOKEN'
    ) {
      requestQueue.push(task);

      if (isReAuthorizatting) {
      } else {
        isReAuthorizatting = true;
        transports.api.removeStorageSync(authorizationKey);
        defaultHeaders.Authorization = null;
        authorizationToken = null;
        

        getAuthorizationToken().then(() => {
          let q;

          while (q = requestQueue.shift()) {
            debugger;
            q();
          }

          isReAuthorizatting = false;
        }).catch(err => {
          requestQueue = [];
          isReAuthorizatting = false;
        });
      }
      return true;
    }
  });

  if (!isStop) {
    reject(errors);
  }
}

export const defaultHeaders = {};
export default function graphql (ql, options = {}) {
  

  return (variables) => new Promise((resolve, reject) => {
    const task = () => {
      transports.api.request({
        method: 'POST',
        dataType: 'json',
        ...options,
        url: endport,
        header: {
          ...defaultHeaders,
          ...options.headers,
          'x-trace-id': uuid.v4()
        },
        data: {
          query: ql,
          variables
        },
      }).then(res => {
        const data = res.data;
  
        if (data.errors) {
          handleErrors(data.errors, task, reject);  
        } else {
          resolve(data);
        }
      }).catch(err => {
        reject(err)
      });
    }

    task();
  })
}

