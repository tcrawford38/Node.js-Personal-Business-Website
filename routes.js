const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
      }
     if (url === '/message' && method === 'POST') {
       const body = [];
       req.on('data', (chunk) => { 
         body.push(chunk);
       });
       req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         const message = parsedBody.split('=')[1];
         fs.writeFileSync('message.txt', message);
         res.statuscode = 302;
         return res.end();
       });
     }
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Hello World');
};

module.exports = requestHandler;