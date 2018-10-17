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
            console.log('Received message', event.data);
            this.receive(event.data);
        });
    }

    isOpen() {
        return this.conn.readyState === WebSocket.OPEN;
    }

    receive(msg) {
        const message = JSON.parse(msg);

        if (message.type === 'chat') {
            this.chat.appendMessage(message.data.userid, message.data.message);
        }
        else if (message.type === 'server_broadcast') {
            const users = [];
            users.push(message.data.peers.you);
            message.data.peers.clients.forEach(client => {
                if (client.id !== message.data.peers.you) {
                    users.push(client.id);
                }
            });
            this.chat.updateUserList(users);
        }
        else if (message.type === 'chat_history') {
            const messages = message.data.messages;
            messages.forEach(msg => {
                this.chat.appendMessage(msg.userid, msg.message);
            });
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