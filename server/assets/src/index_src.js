let SrcIndexFactory = function (server, UploadFile, ProcessFile) {
    let app = server.app;

    app.post('/api/file_upload', UploadFile.fileUpload);
    app.get('/api/process_file', ProcessFile.processFile);
    app.get('/api/get_teams', ProcessFile.teamMates);

    return true

};
module.exports = SrcIndexFactory;