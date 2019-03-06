import Events from './Events.js';

export default class Connection {

    constructor(address) {
        this.events = new Events();
        this.connection = new WebSocket(address);
        
        this.connection.addEventListener('open', () => {
            this.events.emit('open');
        });
        
        this.connection.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            this.events.emit(message.type, message.data);
        });
    }

    close() {
        this.connection.close();
    }

    send(data) {
        const message = JSON.stringify(data);
        this.connection.send(message);
    }

    isOpen() {
        return this.connection.readyState === WebSocket.OPEN;
    }
}