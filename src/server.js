const net = require("net")
const fs = require("fs")

const customAddr = {
    "ip" : process.argv[2],
    "port" : process.argv[3]
}

let ostream = fs.createWriteStream("./server-path/Take_Home_Exerecise_4.pdf")

server = net.createServer(socket => {
    socket.on('data', chunk => {
        ostream.write(chunk)
    })
    socket.on('end', () => {
        socket.write("File successfully transfered!")
    })
})

// Default to listening on port localhost:8000, but can be overriden with custom ip and port
if(customAddr.port && customAddr.ip){
    server.listen(customAddr.port, customAddr.ip)
} else {
    server.listen(8000, 'localhost')
}