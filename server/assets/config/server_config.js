const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    Promise = require('bluebird'),
    path = require('path'),
    fileUpload = require('express-fileupload');

const ServerFactory = function(config, fileUploadConst){
    let app = express(),
        server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(fileUpload({limits: { fileSize: fileUploadConst.MaxFileSizeToAllow }}));
    app.use(expressValidator());
    app.set('json spaces', null, 3);
    app.use(expressValidator({
        customValidators: {
            isValid: function(value, filename) {

                let extension = (path.extname(filename)).toLowerCase();
                return extension === '.csv' || extension === '.pdf' || extension === '.xlsx';

            }
        }
    }));

    // app.use(jwt({ secret: jwtConst.key}).unless({path: ['/api/generate_token']}));

    const port = process.env.Server_Port | 3000;
    const url = process.env.Server_Url | '127.0.0.1';

    function start(){
        let listenPromise = Promise.promisify(server.listen, {context : server});
        return listenPromise(port, config.url)
            .then(function(){
                let host = server.address().address;
                let port = server.address().port;
                console.log('Express is listening on', host + ':' + port);
            });
    }

    function stop(){
        server.close();
    }

    return {
        start: start,
        stop: stop,
        app: app,
        server: server
    }
};

module.exports = ServerFactory;