class ConnectionManager {
    constructor(chat) {
        this.chat = chat;
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

            console.log('Received message', message);
            this.chat.addMessage(message.data.userid, message.data.message, message.data.date);
        }
        else if (message.type === 'server_broadcast') {

            console.log('Received message', message.type);
            const users = new Set();
            users.add(message.data.peers.you);
            message.data.peers.clients.forEach(client => users.add(client.id));
            this.chat.updateUserList(users);
        }
        else if (message.type === 'chat_history') {

            console.log('Received message', message.type);
            const messages = message.data.messages;
            this.chat.addHistory(messages);
        }
        else if (message.type === 'user_started_typing') {
            this.chat.addCurrentTyper(message.data.userid);
        }
        else if (message.type === 'user_stopped_typing') {
            this.chat.removeCurrentTyper(message.data.userid)
        }
        else if (message.type === 'pong') {

            console.log('Ping pong successful.');
        }
       
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn.send(msg);
    }
}

export default ConnectionManager;