import * as Storage from '../service/AsyncStoreConfig';
import axios from 'axios';
const instance = axios.create();

const headers1 = {
  'Content-type': 'application/json',
  AuthKey: '5e4c5e365c7ffa50c64980cbe91559f1',
};
const headers2 = {
  'Content-Type': 'multipart/form-data',
  AuthKey: '5e4c5e365c7ffa50c64980cbe91559f1',
};
export class ApiConfig {
  postJSON(params = {}, URL) {
    console.log(URL);
    return new Promise((resolve, reject) => {
      Storage.getData('authtoken').then((authtoken) => {
        //     console.log("-------authtoken--------->", authtoken);
        instance({
          method: 'POST',
          headers: authtoken
            ? {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authtoken,
              }
            : {
                'Content-Type': 'application/json',
              },
          url: URL,
          data: params,
        })
          .then((res) => {
            //console.log("success", URL, res.data)
            resolve(res);
          })
          .catch((ERROR) => {
            //console.log("ERROR", URL, params, ERROR, ERROR.response.data)
            reject(ERROR);
          });
      });
    });
  }

  postJSONwithToken(params = {}, URL) {
    console.log(URL);
    return new Promise((resolve, reject) => {
      Storage.getData('authtoken').then((authtoken) => {
        console.log('-------authtoken--------->', authtoken);
        instance({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authtoken,
          },
          url: URL,
          data: params,
        })
          .then((res) => {
            //console.log("success", URL, res.data)
            resolve(res);
          })
          .catch((ERROR) => {
            //console.log("ERROR", URL, params, ERROR, ERROR.response.data)
            reject(ERROR);
          });
      });
    });
  }

  postFormJSON(params = {}, URL) {
    return new Promise((resolve, reject) => {
      // Storage.getData('authtoken').then((authtoken) => {
      //     console.log("-------authtoken--------->", authtoken);
      instance({
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;',
        },
        url: URL,
        data: params,
      })
        .then((res) => {
          //console.log("success", URL, res.data)
          resolve(res);
        })
        .catch((ERROR) => {
          //console.log("ERROR", URL, params, ERROR, ERROR.response.data)
          reject(ERROR);
        });
    });
    //});
  }

  putJSON(params = {}, URL) {
    return new Promise((resolve, reject) => {
      Storage.getData('authtoken').then((authtoken) => {
        instance({
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authtoken,
          },
          url: URL,
          data: params,
        })
          .then((res) => {
            //console.log("success", URL, res.data)
            resolve(res);
          })
          .catch((ERROR) => {
            //console.log("ERROR", URL, params, ERROR, ERROR.response)
            reject(ERROR);
          });
      });
    });
  }

  deleteJSON(URL) {
    return new Promise((resolve, reject) => {
      Storage.getData('authtoken').then((authtoken) => {
        instance({
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authtoken,
          },
          url: URL,
        })
          .then((res) => {
            //console.log("success", URL, res.data)
            resolve(res);
          })
          .catch((ERROR) => {
            //console.log("ERROR", URL, params, ERROR, ERROR.response)
            reject(ERROR);
          });
      });
    });
  }

  getJSON(URL) {
    console.log(URL);
    return new Promise((resolve, reject) => {
      Storage.getData('authtoken').then((authtoken) => {
        //  console.log("-------authtoken--------->", authtoken);
        //   console.log("----getJSON-------"+URL)
        //  console.log(headers)
        instance({
          method: 'GET',
          headers: authtoken ? {Authorization: 'Bearer ' + authtoken} : null,
          url: URL,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((ERROR) => {
            reject(ERROR);
          });
      });
    });
  }

  getJSONData(URL, params = {}) {
    console.log(URL);
    return new Promise((resolve, reject) => {
      Storage.getData('authtoken').then((authtoken) => {
        console.log('-------authtoken--------->', authtoken);
        console.log('----getJSON-------' + URL);
        instance({
          method: 'GET',
          headers: authtoken ? {Authorization: 'Bearer ' + authtoken} : null,
          url: URL,
          data: JSON.stringify(params),
        })
          .then((res) => {
            resolve(res);
          })
          .catch((ERROR) => {
            reject(ERROR);
          });
      });
    });
  }
}
