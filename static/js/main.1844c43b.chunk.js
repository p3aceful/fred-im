(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){e.exports=a.p+"static/media/doge.69ae4e8f.png"},18:function(e,t,a){e.exports=a(33)},25:function(e,t,a){},27:function(e,t,a){},29:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);a(19);var s=a(1),n=a.n(s),i=a(4),c=a.n(i),o=(a(25),a(5)),l=a(6),r=a(9),u=a(8),d=a(10),h=(a(27),a(3)),m=function(){function e(t){Object(o.a)(this,e),this.chat=t,this.conn=null,this.id=null,this.peers=new Map,this.send=this.send.bind(this)}return Object(l.a)(e,[{key:"connect",value:function(e){var t=this;this.conn=new WebSocket(e),this.conn.addEventListener("open",function(){console.log("Connection established!")}),this.conn.addEventListener("message",function(e){t.receive(e.data)})}},{key:"isOpen",value:function(){return this.conn.readyState===WebSocket.OPEN}},{key:"receive",value:function(e){var t=this,a=JSON.parse(e);if(console.log("Received message",a.type),"chat"===a.type)this.chat.addMessage(a.data.userid,a.data.message);else if("server_broadcast"===a.type){var s=[];s.push(a.data.peers.you),a.data.peers.clients.forEach(function(e){e.id!==a.data.peers.you&&s.push(e.id)}),this.chat.updateUserList(s)}else if("chat_history"===a.type){a.data.messages.forEach(function(e){t.chat.addMessage(e.userid,e.message)})}else"pong"===a.type&&console.log("Ping pong successful.")}},{key:"send",value:function(e){var t=JSON.stringify(e);console.log("Sending message",t),this.conn.send(t)}}]),e}(),g=a(7),v=(a(29),a(16)),p=a.n(v),f=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(r.a)(this,Object(u.a)(t).call(this,e))).state={value:"",messages:[],users:[]},a.connectionManager=null,a.handleChange=a.handleChange.bind(Object(h.a)(Object(h.a)(a))),a.sendMessage=a.sendMessage.bind(Object(h.a)(Object(h.a)(a))),a.send=a.send.bind(Object(h.a)(Object(h.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.connectionManager=new m(this),this.connectionManager.connect("wss://fred-im.herokuapp.com"),this.timeoutId=setTimeout(this.send,3e4,{type:"ping"})}},{key:"sendMessage",value:function(e){e.preventDefault(),this.send({type:"chat",message:this.state.value}),this.setState({value:""})}},{key:"send",value:function(e){clearInterval(this.timeoutId),this.connectionManager.send(e),this.timeoutId=setTimeout(this.send,3e4,{type:"ping"})}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"addMessage",value:function(e,t){var a=JSON.parse(JSON.stringify(this.state.messages));a.push({user:e,message:t}),this.setState({messages:a}),this.scrollToBottom()}},{key:"updateUserList",value:function(e){this.setState({users:e})}},{key:"scrollToBottom",value:function(){var e=this.messageList.scrollHeight-this.messageList.clientHeight;this.messageList.scrollTop=e>0?e:0}},{key:"render",value:function(){var e=this,t=this.state.messages.map(function(t,a){var s=a===e.state.messages.length-1||n.a.createElement("hr",null);return n.a.createElement("div",{key:a},n.a.createElement("div",{className:"media"},n.a.createElement("img",{className:"imagedoge",src:p.a,alt:"Doge"}),n.a.createElement("div",{className:"media-body"},n.a.createElement("h5",{className:"mt-0"},t.user),t.message)),s)}),a=this.state.users.map(function(e){return n.a.createElement("li",{key:e},e)});return n.a.createElement("div",{className:"container-fluid h-100"},n.a.createElement("div",{className:"row h-100"},n.a.createElement("div",{className:"col d-flex flex-column"},n.a.createElement("div",{className:"row flex-fill"},n.a.createElement("div",{className:"col messages-container",ref:function(t){e.messageList=t}},n.a.createElement("div",{className:"messages"},t))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col p-2 chat-form"},n.a.createElement(g.b,{onSubmit:this.sendMessage},n.a.createElement(g.c,{row:!0},n.a.createElement(g.a,null,n.a.createElement(g.d,{id:"message-input",placeholder:"Message...",type:"text",onChange:this.handleChange,value:this.state.value}))))))),n.a.createElement("div",{className:"col-sm userlist"},"Userlist:",n.a.createElement("ul",null,a))))}}]),t}(s.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(r.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(f,null))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.1844c43b.chunk.js.map