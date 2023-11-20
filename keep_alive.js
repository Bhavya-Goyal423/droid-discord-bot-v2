const http = require("http");

http
  .createServer((req, res) => {
    res.write("I'm Alive");
    res.end();
  })
  .listen(8080);
