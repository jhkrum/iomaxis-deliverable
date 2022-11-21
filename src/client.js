const net = require("net")
const fs = require("fs")

const customAddr = {
    "ip" : process.argv[3],
    "port" : process.argv[4]
}

let istream = fs.createReadStream(`./client-path/${process.argv[2]}`)
let socket = new net.Socket()
socket.pipe(process.stdout)


// Default to connecting on port localhost:8000, but can be overriden with custom ip and port
if(customAddr.port && customAddr.ip){
    socket.connect(customAddr.port, customAddr.ip, () => {
        istream.on("readable", function() {
            let data
            while (data = this.read()) {
                socket.write(data)
            }
        })
        istream.on("end", function() {
            istream.close()
            socket.end()
        })
    })
} else {
    socket.connect(8000, 'localhost', () => {
        istream.on("readable", function() {
            let data
            while (data = this.read()) {
                socket.write(data)
            }
        })
        istream.on("end", function() {
            istream.close()
            socket.end()
        })
    })
}