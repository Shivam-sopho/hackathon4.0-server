module.exports = function(io){
    io.sockets.on("connection",handleSockets);
    function handleSockets(socket){
        socket.on("login",function(data){
            
        })
    }
};