# nodejs后端服务器代码和用法进行介绍
##### 1. 使用http创建静态web服务器
##### 2. 创建路由
##### 3. 设置路由
然后创建服务器
```
var http = require('http')
var path = require('path')//处理URL
var fs = require('fs')//用于读写文件
var url = require('url')//自动解析URL
function rountPath(req,res){
    var pathobj = url.parse(req.url,true)
    //url.parse()可以将一个完整的URL地址，分为很多部分，常用的有：host、port、pathname、path、query。url.parse()第二个参数为true，query属性会生成一个对象，如果为false,则返回url对象上的query属性会是一个未解析，未解码的字符串，默认为false。
    var handlefn = rounts[pathobj.pathname]
    //如果pathname与动态路由routes相匹配，则按rounts的要求执行，否则执行static中的内容
    if(handlefn){
        req.query = pathobj.query//发送附带搜索条件的GET请求，则将 query 绑定到 req 上
        var body = ''
        //发送附带搜索条件的POST请求，则监听数据内容，将数据内容存放 body 中，用 parseBody(body) 将其进行解析后绑定到 req 上
        req.on('data', function(chunk){
            body += chunk
        }).on('end', function(){
            req.body = parseBody(body)
            handlefn(req, res)
        })  
    }else{
        staticRoot(path.join(__dirname, 'sample'), req, res)//设置静态目录地址
    }
}
var rounts = {
    //设置路由
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
    //解析用户请求的url，将url的路径名称和静态目录的名称进行拼接，若url指定文件存在，则返回该文件内容
    var pathobj = url.parse(req.url, true)
    var filePath = path.join(staticPath, pathobj.pathname)
    fs.readFile(filePath,'binary', function(err, content){//用二进制读取文件，如果找不到则输出404，找到则数出200
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
    //创建服务器，用户请求信息存放在req中，通过req获取用户请求的相关信息，res是服务器需要返回给用户哪些信息。
    res.setHeader('Content-Type','text/html;charset=utf-8');//设置响应头
    rountPath(req,res)//对发送过来的url进行解析
})
console.log('open http://localhost:8080')//提示用户服务器地址
server.listen(8080)//设置服务器端口，通过listen去启动服务器
```