let UploadFileApiFactory = function (ProcessFileService) {

    function processFile(req, res){
        ProcessFileService.processFile().then((data) => {
            res.status(200).json({
                message: data
            });
        }).catch(function (err) {
            res.status(404).json({
                message: err,
            })
        })
    }

    function teamMates(req, res){
        let searchFor = '';
        if(req && req.query && req.query.search){
            searchFor = req.query.search
        }else {
            searchFor = '';
        }
        ProcessFileService.teamMates(searchFor).then((data) => {
            res.status(200).json({
                message: data
            });
        }).catch(function (err) {
            res.status(404).json({
                message: err,
            })
        })
    }

    return{
        processFile,
        teamMates
    }

};

module.exports = UploadFileApiFactory;