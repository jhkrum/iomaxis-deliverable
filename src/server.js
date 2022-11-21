const net = require("net")
const fs = require("fs")

const customAddr = {
    "ip" : process.argv[2],
    "port" : process.argv[3]
}


let ostream = fs.createWriteStream(`./server-path/test.txt`)

server = net.createServer(socket => {
    socket.on('data', chunk => {
        ostream.write(chunk)
    })

    socket.on('error', err => {
        socket.write("\rThere was an error uploading the file. See more details below:")
        socket.write(`\r${err}`)
    })

    socket.on('end', () => {
        socket.write("\rFile successfully transfered!")
    })
})

// Default to listening on port localhost:8000, but can be overriden with custom ip and port
if(customAddr.port && customAddr.ip){
    server.listen(customAddr.port, customAddr.ip)
} else {
    server.listen(8000, 'localhost')
}