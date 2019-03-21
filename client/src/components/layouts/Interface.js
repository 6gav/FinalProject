import React, { Component } from 'react'
import Img_Interface from '../resources/UserInterface.png'

const UIStyle = {
    backgroundColor:"#cfc"
}



class MessageList extends React.Component{
    messagesEnd = null;
    state = {
        list : document.createElement('ul'),
        messageCount:0,
        bottom:null,
    }
    scrollToBottom = () => {
        if(this.state.bottom){
            this.state.bottom.scrollIntoView({ behavior: "smooth" });
        }
      }
    constructor(props){
        super(props);
        let messages=[]
        
        if(props.messages){
            for(let i = 0; i < props.messages.length; i++){
                if(props.messages[i]!= ""){
                    messages.push(props.messages[i])
                }
            }
        }
        this.state.messages = messages
        
        let messageCount = this.state.messageCount;
        this.state.list.className="OrderedList"
        if(messages.length!=0){
            //for(var i = messages.length-1; i >= 0; i--){
            while(messageCount < messages.length){
                if(messages[messageCount]!= "" && messages[messageCount]!= null){

                    var item = document.createElement('li')
                    item.className="ListItem"
                    item.appendChild(document.createTextNode(messages[messageCount]));
                    
                    this.state.list.appendChild(item);
                    this.state.bottom = item;
                }
                messageCount++;
                
            }
            this.state.messageCount = messageCount
            console.log("Messages")
            console.log(messages)
        }
    }
    componentDidUpdate(props){
        
        
        let list = this.state.list;
        let messages=props.messages?props.messages:[]
        let messageCount = this.state.messageCount;
        if(messageCount < messages.length && 0 < messages.length){
            
            
            var item = document.createElement('li')
                item.appendChild(document.createTextNode(messages[messageCount]));
                
                list.appendChild(item);
                this.setState({messageCount:( messageCount+1)})
                this.scrollToBottom();
        }
        this.state.list = list;
        
        if(list != null){
            document.getElementById("listContainer").appendChild(list)
            }
    }
    render(){
        return (
        <div id="listContainer">
        </div>
        );
    }
}


class Interface extends React.Component {
    state={
        pos:[-1,-1],
        messages:[],
        user_input:"",
        MouseClick: false,
    }
    constructor(props){
        super(props)
        if(props.messages){
            this.state.messages = props.messages
        }
    }
    componentDidMount(props){
        this.setState({pos:props})
    }
    parseApiCall(data){
        if(data.length>1){
            
        }
        let arr = []
        arr.push("TEST API RESPONSE")
        for(let i = 1; i < data.length;i++){
            arr.push(data[i])
        }
        return arr
    }
    PlayersCommand(data){
        
        let response = "";
        if(this.props.GetPlayers){
            let players = this.props.GetPlayers();
            if(data.length == 1){
                response = []
                response.push("Number of players: "+players.count)
                for(let i = 0; i < players.count;i++){
                    response.push("Player "+i+": x: "+ players.players[i].x + " y: " + players.players[i].y + " id: "+players.players[i].id)
                    
                }
                
            }
        }
        else{
            response.push("Error, GetPlayers Method not found")
        }
        return response
    }
    parseMessage(message){
        
        let data = message.split(' '),response = ""
        
        switch(data[0]){
            case "/api":
            response = this.parseApiCall(data)
            break;
            case "/help":
                response = ["nohelp4u","cint"]
            break;
            case "/p":
                response = this.PlayersCommand(data)
            break;
            case "/command":
            response = "This is a response to a command."
            break;
            default:
                console.log(data)
                response = "Unrecognized command - enter /help to see a list of commands"
            break;
            
            
        }
        return response;
    }
    
    AddMessage(message){
        console.log(message)
        let messages = this.state.messages;
        if(messages){
            if(typeof message == "string"){
                messages.data.push(message)
    
            }
            
            if(Array.isArray(message))
            {
                for(let i = 0; i < message.length; i++){
                    messages.data.push(message[i])
                }
            }
            else if(message.data){
                if(message.id != this.state.id){
                    messages.data.push(message.data[0])
                    this.state.id = message.id?message.id:this.state.id
                    this.forceUpdate()
                }
            }
        this.state.messages = messages;
        }
    }
    //#region handles
    handleSubmit(event){
        event.preventDefault();
        let message = this.state.user_input,messages = this.state.messages;
        this.state.user_input = "";
        if(message != "" && messages != null){
            
            if(typeof message == "string"){
                this.AddMessage({data:[message],id:null})
            }
            else{
                this.AddMessage({data:message,id:-1})
            }
            if(message[0]=='/')
            {
                let resp = this.parseMessage(message)
                if(typeof resp == "string"){
                    this.AddMessage({data:[resp],id:0})
                }else if(Array.isArray(resp)){
                    console.log("Hello")
                    for(let i = 0; i < resp.length; i++){
                        
                        this.AddMessage(resp[i])
                    }
                }
            }
            this.setState({messages:messages})
        }

        
    }
    handleUserInputChange(event){
        this.setState({user_input:event.target.value});
        
    }
    //#endregion
    componentDidUpdate(props){
        let mid = this.state.id?this.state.id:-1;
        if(this.props.messages){
                {
                    if(this.props.messages.data.length != 0){
                    //there is retrievable data
                    if(mid != this.props.messages.id){

                        console.log("mid: " + this.state.id + " lastid: " + this.props.messages.id)
                        if(Array.isArray(this.props.messages)){
                            for(let i = 0; i < this.props.messages.length; i++){
                                this.AddMessage(this.props.messages[i])
                            }
                        }
                        else{
                            this.AddMessage(this.props.messages)
                        }
                        this.state.id = this.props.messages.id

                    }
                }
            }
        }
    }
      
    render(){
        if(this.state.messages){

        }
        console.log(this.state.messages)
        console.log("hello")
        console.log(this.state)
        //console.log(this.state.pos)
        return(
            <div className='UserInterface'>
                <img className="Background" src={Img_Interface}/>
                <div className="History">
                    
                    <MessageList messages={this.state.messages.data} />
                    
                </div>
                <form  className="Input-Form" onSubmit={this.handleSubmit.bind(this)}>
                <input className="User_Input" onChange={this.handleUserInputChange.bind(this)} type="text" placeholder=". . ." value={this.state.user_input}/> 
                </form>
            </div>
        )
    }
}

export default Interface;