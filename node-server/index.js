var http = require('http')
var path = require('path')//处理URL
var fs = require('fs')//用于读写文件
var url = require('url')//自动解析URL
function rountPath(req,res){
    var pathobj = url.parse(req.url,true)
    var handlefn = rounts[pathobj.pathname]
    if(handlefn){
        req.query = pathobj.query
        var body = ''
        req.on('data', function(chunk){
            body += chunk
        }).on('end', function(){
            req.body = parseBody(body)
            handlefn(req, res)
        })
        
    }else{
        staticRoot(path.join(__dirname, 'sample'), req, res)
    }
}
var rounts = {
    '/a': function(req, res){
        res.end(JSON.stringify(req.query))
    },
    '/b': function(req, res){
        res.end('match /b')
    },
    '/a/c': function(req, res){
        res.end('match /a/c')
    },
    '/search': function(req, res){
        res.end('username='+req.body.username+',password='+req.body.password)
    }
}
function staticRoot(staticPath,req,res){
    var pathobj = url.parse(req.url, true)
    var filePath = path.join(staticPath, pathobj.pathname)
    fs.readFile(filePath,'binary', function(err, content){
        if(err){
        res.writeHead('404', 'haha Not Found')
        return res.end()
        }
    
        res.writeHead(200, 'Ok')
        res.write(content, 'binary')
        res.end()  
    })     
}
function parseBody(body){
    console.log(body)
    var obj = {}
    body.split('&').forEach(function(str){
      obj[str.split('=')[0]] = str.split('=')[1]
    })
    return obj
}
var server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    rountPath(req,res)
})
console.log('open http://localhost:8080')
server.listen(8080)