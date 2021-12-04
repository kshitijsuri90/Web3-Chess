import React from 'react'
import { useParams } from 'react-router-dom'
const socket  = require('../connection/socket').socket

/**
 * 'Join game' is where we actually join the game room. 
 */


const JoinGameRoom = (gameid, userName, isCreator, stake, time) => {
    /**
     * For this browser instance, we want 
     * to join it to a gameRoom. For now
     * assume that the game room exists 
     * on the backend. 
     *  
     * 
     * TODO: handle the case when the game room doesn't exist. 
     */
    const idData = {
        gameId : gameid,
        userName : userName,
        stake : stake,
        isCreator: isCreator,
        time : time
    }
    console.log(idData)
    socket.emit("playerJoinGame", idData)
}
  
function getTime(gameId){
    var string = gameId.toString()
    var time = gameId.substr(string.lastIndexOf("t")+1, string.length);
    return time;
}

const JoinGame = (props) => {
    /**
     * Extract the 'gameId' from the URL. 
     * the 'gameId' is the gameRoom ID. 
     */
    const { gameid } = useParams()
    var time = getTime(gameid)
    JoinGameRoom(gameid, props.userName, props.isCreator, props.stake, time)
    return <div>
     </div>
}

export default JoinGame
  
