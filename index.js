const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8000;

const welcome = fs.readFileSync(path.join(__dirname,'template','welcome.html'),'utf-8');
const products = fs.readFileSync(path.join(__dirname,'api','data.json'),'utf-8');
const productList = fs.readFileSync(path.join(__dirname,'template','product-list.html'),'utf-8');

function fileRead(filePath,encode = 'utf-8'){
    fs.readFileSync(filePath,encode,(err,data) => {
        if(err) throw err;
        console.log(data);
    });
}

const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.end(welcome.replace('{{%BODY%}}','HOME PAGE'));
    }else if(pathName === '/about'){ 
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        });
        res.end(welcome.replace('{{%BODY%}}','About Page'));
    }else if(pathName === '/contact'){ 
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        });
        res.end(welcome.replace('{{%BODY%}}','Contact Page'));
    }else if(pathName === '/products'){
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        });
        res.end(welcome.replace('{{%BODY%}}',productList));
    }else if(pathName === '/api'){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        res.end(products);
    }else{ // 404
        res.writeHead(404,{
            'Content': 'text/html'
        });
        res.end('<h1>Not Found</h1>');
    }
});



server.listen(port,hostname,()=>{
    console.log('server is running in http://' + hostname + ':' + port);
});
