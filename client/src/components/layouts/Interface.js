import React, { Component } from 'react'
import Img_Interface from '../rescources/UserInterface.png'
import './Interface.css'
const UIStyle = {
    backgroundColor:"#cfc"
}



class MessageList extends React.Component{
    messagesEnd = null;
    state = {
        list : null,
        bottom:null,
        showButton:true
    }
    constructor(props){
        super(props);
        let messages=this.props.messagess
        if(props.messages){
            for(let i = 0; i < this.props.messages.length; i++){
                
            }
        }
        this.state.messages = messages
        
        let messageCount = this.state.messageCount;
        
    }
    
    render(){
        let i = 0;
        return (
        <div id="listContainer"style ={{overflow: 'scroll',position:'absolute',backgroundColor:'#eee',top:'20px',left:'19px',width:'361px',height:'473px'}}>
        
        <ul className="Message-List">
            {
                
                this.props.messages.map( (message)=>{
                    i++;
                    if(i == this.props.messages.length){
                        return <div key={message.id} id="LastMessage" name="LastMessage">
                        <div className="MessageDivider"/>
                            <li><div>
                            {message.sender}:  {message.data}
                            </div></li>
                        </div>
                    }
                    else{
                        return <div key={message.id}>
                    <div className="MessageDivider"/>
                        <li><div>{message.sender}:  {message.data}</div></li>
                    </div>
                    }
            
                }
                )}
        </ul>
        
        </div>
        );
    }
}


class Interface extends React.Component {
    state={
        pos:[-1,-1],
        user_input:"",
        MouseClick: false,
    }
    constructor(props){
        super(props)
        if(props.messages){
            
        }
    }
    parseApiCall(data){
        if(data.length>1){
            
        }
        let arr = []
        arr.push({sender:'//',data:"TEST API RESPONSE"})
        for(let i = 1; i < data.length;i++){
            arr.push({sender:'//',data:data[i]})
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
        
        switch(data[0])
        {
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
            case "/resize":
                let obj = {};
                if(data.length > 1){
                    obj = {gridSize:data[1]}
                    if(data.length > 2){
                        obj.gridSpacing = data[2]
                    }
                    response = "Resized the window"
                    this.props.onDebugValuesChange(obj)
                }
                else{
                    response = "/resize (scale) (spacing)"
                }
            break;
            default:
                console.log(data)
                response = "Unrecognized command - enter /help to see a list of commands"
            break;
            
            
        }
        return {data:response};
    }
    
    //#region handles
    handleSubmit(event){
        event.preventDefault();
        this.scrollToBottom()
        let message = this.state.user_input,messages = this.state.messages;
        this.state.user_input = "";
        if(message != ""){
            if(typeof message == "string"){
                this.props.AddMessage({data:[message],id:null})
            }
            else{
                this.props.AddMessage({data:message,id:-1})
            }
            if(message[0]=='/')
            {
                let resp = this.parseMessage(message)
                
                if(typeof resp.data == "string"){
                    this.props.AddMessage(resp)
                }else if(Array.isArray(resp.data)){
                    for(let i = 0; i < resp.data.length; i++){
                        this.props.AddMessage({sender:'arr',data:resp.data[i]})
                    }
                }
                else{
                    this.props.AddMessage(resp)
                }
            }
        }

        
    }
    handleUserInputChange(event){
        this.setState({user_input:event.target.value});
        
    }
    //#endregion
    
    
    scrollToBottom = () => {
        let bottom = document.getElementsByName("LastMessage")
        
        if(bottom[0]){
            bottom[0].scrollIntoView({ behavior: "smooth" });
        }
      }
    
    componentDidMount(){
        this.scrollToBottom()
    }

    render(){
        return(
            <div className='UserInterface'>
                <img className="Background" src={Img_Interface}/>
                <div className="History">
                    <MessageList  messages={this.props.messages}/>
                </div>
                <form  className="Input-Form" onSubmit={this.handleSubmit.bind(this)}>
                    <input name="ib_messages" className="User_Input" onChange={this.handleUserInputChange.bind(this)} type="text" placeholder=". . ." value={this.state.user_input}/> 
                </form>
            </div>
        )
    }
}

export default Interface;