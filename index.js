const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8000;

const mainTemplate = fs.readFileSync(path.join(__dirname,'product','index.html'),'utf-8');
const productCard = fs.readFileSync(path.join(__dirname,'product',"product-card.html"),'utf-8');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,'data','product.json'),'utf-8'));

function productCardTemplate(productCard,product){
    let output = productCard.replace('{%PRODUCT_TITLE%}',product.name);
    output = output.replace('{%PRODUCT_DECRIPTION%}',product.description)
    output = output.replace('{%PRODUCT_PRICE%}',product.price)
    output = output.replace('{%PRODUCT_IMAGE%}',product.image)
    return output;
}

const server = http.createServer((req,res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/products'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        
        const productCardList =  products.map((product) => productCardTemplate(productCard,product));
        console.log(productCardList);
        res.end(mainTemplate.replace('{%PRODUCT%}',productCardList.join('')));
    }else if(pathName === '/cart'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        
        res.end(mainTemplate.replace('{%PRODUCT%}','Cart List'));
    }else if(pathName === '/about'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(mainTemplate.replace('{%PRODUCT%}','About US'));
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page not found</h1>');
    }
});


server.listen(port,hostname,()=>{
    console.log('server is running in http://' + hostname + ':' + port);
});