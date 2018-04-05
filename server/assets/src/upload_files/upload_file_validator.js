let UploadFileValidatorFactory = function () {

    return{

        fileUpload : function (req, res) {
            let fileName  = typeof req.files !== "undefined" ? req.files['file'].name : '';
            req.checkBody('file').isValid(fileName).withMessage("Invalid File");

            return new Promise((resolve, reject) => {
                req.getValidationResult().then(function (result) {
                    if(!result.isEmpty()){
                        res.status(400).json({message: result.array()});
                    }else{
                        resolve(req.files.file);
                    }
                }).catch((err) => {
                    console.log("In File Validator"+err.toString())
                });

            })
        }

    }

};

module.exports = UploadFileValidatorFactory;