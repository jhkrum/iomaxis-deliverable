const net = require("net");
const fs = require("fs");

const customAddr = {
    "ip" : process.argv[2],
    "port" : process.argv[3]
}

let istream = fs.createReadStream("./client-path/Take_Home_Exerecise_4.pdf")
let socket = new net.Socket();


// Default to connecting on port localhost:8000, but can be overriden with custom ip and port
if(customAddr.port && customAddr.ip){
    socket.connect(customAddr.port, customAddr.ip, () => {
        istream.on("readable", () => {
            let data
            while (data = this.read()) {
                socket.write(data)
            }
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
            socket.end()
        })
    })
}