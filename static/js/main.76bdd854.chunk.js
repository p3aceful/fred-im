(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n.p+"static/media/doge.69ae4e8f.png"},19:function(e,t,n){e.exports=n(36)},26:function(e,t,n){},28:function(e,t,n){},30:function(e,t,n){},34:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);n(20);var a=n(1),s=n.n(a),i=n(10),r=n.n(i),o=(n(26),n(11)),c=n(5),l=n(6),u=n(8),p=n(7),h=n(9),m=n(3);n(28);var g=n(4),d=n(17),y=n.n(d),f=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.msgs[0].userid;return s.a.createElement("li",{className:"media ow-wrap-break-word"},s.a.createElement("img",{className:"mr-3 avatar rounded-circle",src:y.a,alt:"Avatar"}),s.a.createElement("div",{className:"media-body",style:{minWidth:"0"}},s.a.createElement("h5",{className:"mt-0"},e),s.a.createElement("ul",{className:"list-unstyled"},this.props.msgs.map(function(e,t){return s.a.createElement("li",{key:"".concat(t,"sub").concat(e.date)},e.message)}))))}}]),t}(a.Component),v=(n(30),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={value:""},n.delayBetweenTypingStates=1e4,n.handleChange=n.handleChange.bind(Object(m.a)(Object(m.a)(n))),n.sendChatMessage=n.sendChatMessage.bind(Object(m.a)(Object(m.a)(n))),n.notifyStartTyping=n.notifyStartTyping.bind(Object(m.a)(Object(m.a)(n))),n.notifyStoppedTyping=n.notifyStoppedTyping.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.typingTimeoutID)}},{key:"sendChatMessage",value:function(e){e.preventDefault(),this.notifyStoppedTyping(),this.props.send({type:"chat",message:this.state.value}),this.setState({value:""})}},{key:"handleChange",value:function(e){this.notifyStartTyping(),this.setState({value:e.target.value})}},{key:"notifyStartTyping",value:function(){""!==this.state.value&&(clearTimeout(this.typingTimeoutID),this.timerIsRunning?this.typingTimeoutID=setTimeout(this.notifyStoppedTyping,this.delayBetweenTypingStates):(this.props.send({type:"started_typing"}),this.timerIsRunning=!0,this.typingTimeoutID=setTimeout(this.notifyStoppedTyping,this.delayBetweenTypingStates)))}},{key:"notifyStoppedTyping",value:function(){this.props.send({type:"stopped_typing"}),this.timerIsRunning=!1,clearTimeout(this.typingTimeoutID)}},{key:"render",value:function(){return s.a.createElement(g.c,{fluid:!0,style:{minHeight:"0"},className:"d-flex flex-column flex-grow-1"},s.a.createElement(g.j,{className:"flex-grow-1",style:{overflow:"auto"}},s.a.createElement(g.a,{className:"flex-grow-1"},s.a.createElement(b,{messages:this.props.messages}))),s.a.createElement(g.j,{className:"flex-shrink-0"},s.a.createElement(g.a,{className:"",style:{height:"2em"}},s.a.createElement(O,{typers:this.props.typers}))),s.a.createElement(g.j,{className:"flex-shrink-0"},s.a.createElement(g.a,{className:""},s.a.createElement(g.d,{onSubmit:this.sendChatMessage},s.a.createElement(g.e,null,s.a.createElement(g.f,{className:"",type:"text",name:"text",id:"message-input",placeholder:"Message...",onChange:this.handleChange,value:this.state.value,autoComplete:"off"}))))))}}]),t}(a.Component)),b=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).scrollToBottom=n.scrollToBottom.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.scrollToBottom()}},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"scrollToBottom",value:function(){this.messagesEnd.scrollIntoView()}},{key:"render",value:function(){var e,t,n=this,a=(e=this.props.messages,t="userid",e.reduce(function(e,n){if(e.length){var a=e.pop();return a[a.length-1][t]===n[t]?(a.push(n),e.push(a),e):(e.push(a),e.push([n]),e)}return e.push([n]),e},[])).map(function(e,t){return s.a.createElement(f,{msgs:e,key:"msg-group-"+t})});return a=(a=a.map(function(e,t){return[e,s.a.createElement("hr",{key:"hr"+t})]}).flat()).slice(0,-1),s.a.createElement("ul",{className:"list-unstyled"},a,s.a.createElement("li",{ref:function(e){n.messagesEnd=e}}))}}]),t}(a.Component);function O(e){return e.typers.length?1===e.typers.length?s.a.createElement("span",null,e.typers[0]," is typing a message..."):2===e.typers.length?s.a.createElement("span",null,e.typers[0]," and ",e.typers[1]," are typing a message..."):s.a.createElement("span",null,e.typers[0],", ",e.typers[1]," and ",e.typers.length-2," other users are typing..."):null}var j=v,k=(n(34),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).toggle=n.toggle.bind(Object(m.a)(Object(m.a)(n))),n.state={isOpen:!1},n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){return s.a.createElement(g.g,{className:"bg-dark flex-shrink-0",color:"light",dark:!0},s.a.createElement(g.h,{className:"mr-auto text-light"},"active users"),s.a.createElement(g.i,{onClick:this.toggle,className:"mr-2"}),s.a.createElement(g.b,{isOpen:this.state.isOpen,navbar:!0},s.a.createElement("hr",null),s.a.createElement("div",{className:"text-light"},this.props.users.map(function(e,t){return s.a.createElement("p",{key:"header-user-"+t},e)}))))}}]),t}(a.Component)),E=function(){function e(t){Object(c.a)(this,e),this.uiManager=t,this.conn=null,this.id=null,this.peers=new Map,this.send=this.send.bind(this)}return Object(l.a)(e,[{key:"connect",value:function(e){var t=this;this.conn=new WebSocket(e),this.conn.addEventListener("open",function(){console.log("Connection established!")}),this.conn.addEventListener("message",function(e){t.receive(e.data)})}},{key:"isOpen",value:function(){return this.conn.readyState===WebSocket.OPEN}},{key:"receive",value:function(e){var t=JSON.parse(e);if("chat"===t.type){var n=t.data,a=n.userid,s=n.message,i=n.date;console.log("Received a new message from",a),this.uiManager.receiveMessage(a,s,i)}else if("chat_history"===t.type){console.log("Received a chat log of",t.data.messages.length,"messages.");var r=t.data.messages;this.uiManager.receiveChatHistory(r)}else if("server_broadcast"===t.type){var c=t.data.peers.you,l=t.data.peers.clients;this.uiManager.receiveActiveUsers([c].concat(Object(o.a)(l.map(function(e){return e.id}))))}else"pong"===t.type?console.log("Ping pong successful."):"user_started_typing"===t.type?(console.log("A user started typing"),this.uiManager.addToTypers(t.data.userid)):"user_stopped_typing"===t.type&&(console.log("A user stopped typing"),this.uiManager.removeFromTypers(t.data.userid))}},{key:"send",value:function(e){var t=JSON.stringify(e);console.log("Sending message",t),this.conn.send(t)}}]),e}(),T=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={messages:[],users:[],typers:[]},n.connectionManager=null,n.send=n.send.bind(Object(m.a)(Object(m.a)(n))),n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.getServerUrl();this.connectionManager=new E(this),this.connectionManager.connect(e),this.pingTimeoutId=setTimeout(this.send,3e4,{type:"ping"})}},{key:"removeFromTypers",value:function(e){this.setState(function(t){return{typers:t.typers.filter(function(t){return t!==e})}})}},{key:"getServerUrl",value:function(){return"localhost"===window.location.hostname?"ws://localhost:9876":"wss://fred-im.herokuapp.com"}},{key:"receiveChatHistory",value:function(e){this.setState({messages:e})}},{key:"receiveMessage",value:function(e,t,n){this.setState(function(a){return{messages:Object(o.a)(a.messages).concat([{userid:e,message:t,date:n}])}})}},{key:"receiveActiveUsers",value:function(e){var t=new Set(e);this.setState({users:Object(o.a)(t)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App d-flex flex-column",style:{height:"100vh"}},s.a.createElement(k,{users:this.state.users}),s.a.createElement(j,{users:this.state.users,typers:this.state.typers,messages:this.state.messages,send:this.send}))}},{key:"send",value:function(e){clearTimeout(this.pingTimeoutId),this.pingTimeoutId=setTimeout(this.send,3e4,{type:"ping"}),this.connectionManager.send(e)}},{key:"addToTypers",value:function(e){this.setState(function(t){return{typers:Object(o.a)(t.typers).concat([e])}})}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.76bdd854.chunk.js.map