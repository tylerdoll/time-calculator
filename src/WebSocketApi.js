const debounce = function(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default class WebSocketAPI {
  constructor(handleOnMessage, handleOnDisconnect) {
    this.handleOnMessage = handleOnMessage;
    this.handleOnDisconnect = handleOnDisconnect;
    this.createSocket();
  }

  createSocket() {
    const url = 'wss://qufgkhoacj.execute-api.us-east-2.amazonaws.com/Prod';
    const ws = new WebSocket(url);
    ws.onopen = (event) => {
      console.log("Connected to web socket", event);
      this.getSession();
    }
    ws.onclose = () => {
      console.log("Disconnected from web socket. Reconnecting.");
      this.createSocket();
    }
    ws.onmessage = (event) => {
      console.log("Got message from web socket", event);
      this.handleOnMessage(JSON.parse(event.data));
    }
    this.ws = ws;
  }

  getSession(id='default') {
    console.log("Sending request to get session");
    const payload = {
      action: 'getsession',
      id
    }
    this.ws.send(JSON.stringify(payload));
  }

  sendMessage(data) {
    const payload = JSON.stringify({
      action: 'sendmessage',
      data
    });
    console.log("Sending message", payload);
    this.ws.send(payload);
  }
  lazySendMessage = debounce(this.sendMessage, 500);
}
