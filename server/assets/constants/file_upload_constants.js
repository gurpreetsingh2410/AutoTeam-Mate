const path = require('path');
module.exports = {
    PathToUploadFile : path.resolve("../"+"/spark/assets/dataset/"),
    MaxFileSizeToAllow : 50 * 1024 * 1024 * 100,
    AllowedFileTypes : ['.csv', '.txt', '.xlsx', '.xls']
};

