const http = require("http");
const PORT = 4000;

const server = http.createServer((req, res) => {
    res.end("Hello Coders!");
})

server.listen(PORT, () => {
    console.log(`App is successfully running on ${PORT}`);
})