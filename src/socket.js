class Socket {
  constructor() {
    this.socket = null;
  }

  open(url) {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        this.close();
      }

      if (url) {
        if (window.location.protocol === 'https:') {
          url = url.replace('ws:', 'wss:');
        }

        try {
          this.socket = new WebSocket(url);

          this.socket.onerror = () => {
            reject();
          };
          this.socket.onopen = () => {
            resolve();
          };
          this.socket.onmessage = (event) => {
            this.dispatch(event.data);
          };
        } catch (exception) {
          this.socket = null;
        }
      } else {
        this.socket = null;
      }
    });
  }

  dispatch(data) {
    const message = typeof data === 'string' ? JSON.parse(event.data) : event;

    // do something with message
  }

  send(message) {
    this.socket.send(JSON.stringify(message));
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default new Socket();
