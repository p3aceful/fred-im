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
        const data = JSON.parse(msg);

        if (data.type === 'chat') {
            this.chat.appendMessage(data.sender, data.message);
        }
        else if (data.type === 'server-broadcast') {
            const users = [];
            users.push(data.peers.you);
            data.peers.clients.forEach(client => {
                if (client.id !== data.peers.you) {
                    users.push(client.id);
                }
            });
            this.chat.updateUserList(users);
        }
        else if (data.type === 'pong') {
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