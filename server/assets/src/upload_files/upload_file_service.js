let UploadFileServiceFactory = function (fileUploadConst) {
    function fileUpload(data) {
        return new Promise((resolve, reject) => {
            data.mv(fileUploadConst.PathToUploadFile+"/"+data.name, function(err) {
                if (err){
                    reject(err);
                }else{
                    resolve('File uploaded!');
                }
            });
        }).catch((err) => {
            "use strict";
            console.log(err);
        })
    }

    return {
        fileUpload : fileUpload
    }


};

module.exports = UploadFileServiceFactory;