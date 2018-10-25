class ConnectionManager {
    constructor(uiHandler) {
        this.uiManager = uiHandler;
        this.conn = null;
        this.id = null;
        this.peers = new Map();

        this.send = this.send.bind(this);
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', () => {
            console.log('Connection established!')
        });

        this.conn.addEventListener('message', event => {
            this.receive(event.data);
        });
    }

    isOpen() {
        return this.conn.readyState === WebSocket.OPEN;
    }

    receive(msg) {
        const message = JSON.parse(msg);

        if (message.type === 'chat') {

            const { userid: u, message: m, date: d } = message.data;
            console.log('Received a new message from', u);
            this.uiManager.receiveMessage(u, m, d);
        }
        else if (message.type === 'chat_history') {

            console.log('Received a chat log of', message.data.messages.length, 'messages.');
            const messages = message.data.messages;
            this.uiManager.receiveChatHistory(messages);
        }
        else if (message.type === 'server_broadcast') {
            const me = message.data.peers.you;
            const others = message.data.peers.clients;
            this.uiManager.receiveActiveUsers([me, ...others.map(o => o.id)]);
        }
        else if (message.type === 'pong') {
            console.log('Ping pong successful.');
        }
        else if (message.type === 'user_started_typing') {
            console.log('A user started typing');
            this.uiManager.addToTypers(message.data.userid);
        }
        else if (message.type === 'user_stopped_typing') {
            console.log('A user stopped typing');
            this.uiManager.removeFromTypers(message.data.userid);
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn.send(msg);
    }
}

export default ConnectionManager;