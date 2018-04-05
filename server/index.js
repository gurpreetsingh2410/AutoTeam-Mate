'use strict';
let container = require('./containerConfig');

let SrcIndexFactory = container.get('SrcIndexFactory');


let server = container.startModule('server', { async: true})
    .then(function () {
        console.log('Server Running!!');
        console.log('Available methods\n');
        console.log('========Uploading File Apis==========');
        console.log('/api/file_upload');
        console.log('========Process File==========');
        console.log('/api/process_file');
        console.log('/api/get_teams');

    });

