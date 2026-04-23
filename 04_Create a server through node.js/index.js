const http = require("http");
const PORT = 4000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Hello Coders!");
    } 
    else if (req.url === "/contact") {
        res.end("This is my contact page!");
    }
    else {
        res.end("Page not found!");
    }
})

server.listen(PORT, () => {
    console.log(`App is successfully running on ${PORT}`);
})