(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(8),c=n.n(i),o=(n(14),n(2)),r=n(3),l=n(5),u=n(4),d=n(6),h=(n(16),n(1)),m=function(){function e(t){Object(o.a)(this,e),this.chat=t,this.conn=null,this.id=null,this.peers=new Map,this.send=this.send.bind(this)}return Object(r.a)(e,[{key:"connect",value:function(e){var t=this;this.conn=new WebSocket(e),this.conn.addEventListener("open",function(){console.log("Connection established!")}),this.conn.addEventListener("message",function(e){console.log("Received message",e.data),t.receive(e.data)})}},{key:"isOpen",value:function(){return this.conn.readyState===WebSocket.OPEN}},{key:"receive",value:function(e){var t=JSON.parse(e);"chat"===t.type?this.chat.appendMessage(t.sender,t.message):"pong"===t.type&&console.log("Ping pong successful.")}},{key:"send",value:function(e){var t=JSON.stringify(e);console.log("Sending message",t),this.conn.send(t)}}]),e}(),p=(n(18),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={value:"",messages:[]},n.connectionManager=null,n.handleChange=n.handleChange.bind(Object(h.a)(Object(h.a)(n))),n.sendMessage=n.sendMessage.bind(Object(h.a)(Object(h.a)(n))),n.send=n.send.bind(Object(h.a)(Object(h.a)(n))),n}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.connectionManager=new m(this),this.connectionManager.connect("wss://fred-im.herokuapp.com"),this.timeoutId=setTimeout(this.send,3e4,{type:"ping"})}},{key:"sendMessage",value:function(e){e.preventDefault(),this.send({type:"chat",message:this.state.value}),this.setState({value:""})}},{key:"send",value:function(e){clearInterval(this.timeoutId),this.connectionManager.send(e),this.timeoutId=setTimeout(this.send,3e4,{type:"ping"})}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"appendMessage",value:function(e,t){var n=JSON.parse(JSON.stringify(this.state.messages));n.push("".concat(e,": ").concat(t)),this.setState({messages:n})}},{key:"render",value:function(){var e=this.state.messages.map(function(e,t){return s.a.createElement("li",{key:t,className:"list-group-item"},e)});return s.a.createElement("div",{className:"container-fluid f-90"},s.a.createElement("div",{className:"row f-90"},s.a.createElement("div",{className:"col-9 f-90 messages"},s.a.createElement("ul",{className:"list-group"},e)),s.a.createElement("div",{className:"col-3 f-90 users"},"Active Users")),s.a.createElement("div",{className:"col f-10"},s.a.createElement("div",{className:"row"},s.a.createElement("form",{onSubmit:this.sendMessage},s.a.createElement("div",{className:"input-group"},s.a.createElement("input",{type:"text",placeholder:"Message...",onChange:this.handleChange,className:"form-control",value:this.state.value}),s.a.createElement("div",{className:"input-group-append"},s.a.createElement("button",{className:"btn",type:"button",id:"button-addon2"},"Send")))))))}}]),t}(a.Component)),g=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(p,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(20)}},[[9,2,1]]]);
//# sourceMappingURL=main.5fb81f31.chunk.js.map