export default class Ajax {
  constructor() {

  }

  request(options) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let { data, method, url, headers } = options;

      // format data if it is an object
      if (data && typeof data === 'object') {
        switch (method) {
          case 'GET':
            url += '?' + Object.keys(data).map(function (key) {
              return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
            }).join('&');

            data = null;

            break;
          default:
            data = JSON.stringify(data);
        }
      }

      xhr.open(method, url);

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };

      // send json content on non GET calls
      if (method !== 'GET') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      }

      xhr.send(data);
    });
  }

  get(options) {
    if (typeof options === 'string') {
      options = {
        url: options
      };
    }

    options.method = 'GET';

    return this.request(options);
  }

  post(options) {
    options.method = 'POST';

    return this.request(options);
  }

  put(options) {
    options.method = 'PUT';

    return this.request(options);
  }

  delete(options) {
    options.method = 'DELETE';

    return this.request(options);
  }
}
