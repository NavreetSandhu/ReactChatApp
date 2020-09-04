
import socketIOClient from 'socket.io-client/dist/socket.io.js';
import { socketUrl } from '../environment';
import { connect } from 'react-redux';
import { chatadds } from '../actions/chat';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class Socket {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.socketError = "Client/Server connection lost ";
        this.loginToken = null;
        this.userId = null;
        this.dispatch = null;
        this.chatId = null;
    }


    static init = (token,dispatch,userId,roomId) => {
        if (!this.socket) {
            console.log("Intializing socket");
            this.socket = socketIOClient(socketUrl, {
                jsonp: false,
                transports: ["websocket"]
                //   query: `token=${getState().user.accessToken}`
            });
        }

        console.log("999999",token,userId,dispatch,roomId);

        this.loginToken = token;
        this.dispatch = dispatch;
        this.userId = userId;
        this.chatId = roomId;
    
        this.socket.on("connect", (res) => {
            console.log("Socket connected", this.socket, res);
            this.isConnected = this.socket.connected;
            //Socket.authenticate();
            //Socket.emitEvent("new_message", { test: "hello mobile app" });
            
        });

        this.socket.on("disconnect", (res) => {
            console.log("Socket disconnected", this.socket, res);
            this.isConnected = this.socket.connected;
        });
       

        this.socket.on("reconnect", () => {
            console.log("Re-connected");
        });

        this.socket.on("error", () => {
            console.log("error");
        });

       

        this.socket.on('new'+userId, (res) => {
            console.log('new666666666666666666666666666666666666666666666666',this.chatId,res.chatRoomId);
         if(this.chatId == res.chatRoomId){
            this.dispatch(chatadds(res));
         }
        });

    };

    static emitEvent = (event, payload = {},callback) => {
        console.log(event, "emit started");
        this.socket.emit(event, payload, (res) => {
            console.log(event, "=======>",  res);
             callback(res);
        });
    };
    
    static onEvent = (chatId) => {
        console.log(chatId,'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',this.userId);
        this.chatId = chatId;
    };

    static authenticate = () => {
                   //let {
        //    user: { loginToken }
        //} = this.props.authToken.getState();
        const loginToken = this.loginToken;
        this.socket.emit("authenticate", { token: loginToken }, (res) => {
            console.log( "=======>",  res);
        });
    };
}


export default  Socket;



