let UploadFileApiFactory = function (UploadService, UploadValidator) {

    function fileUpload(req, res){
        UploadValidator.fileUpload(req, res).then((data) => {
            UploadService.fileUpload(data).then((data) => {
                res.status(200).json({
                    message: data
                });
            }).catch(function (err) {
                res.status(404).json({
                    message: err,
                })
            })
        }).catch(function (err) {
            res.status(404).json({
                message: err,
            })
        })
    }


    return{
        fileUpload : fileUpload
    }

};

module.exports = UploadFileApiFactory;