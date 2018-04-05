let container = require('kontainer-di');
let GlobalFactory = require('./assets/assets_route');

//Constant Container
//====================================

container.register('serverConst', [] ,GlobalFactory.Constants.ServerConstant);
container.register('fileUploadConst', [], GlobalFactory.Constants.FileUploadConstant);


//Config Container
//====================================

container.register('server', ['serverConst', 'fileUploadConst'], GlobalFactory.Config.ServerConfig);


//Src Register
//====================================

//-->upload apis
container.register('UploadValidator', [], GlobalFactory.Src.UploadFiles.UploadFileValidatorFactory);
container.register('UploadService', ['fileUploadConst'], GlobalFactory.Src.UploadFiles.UploadFileServiceFactory);
container.register('UploadApi', ['UploadService', 'UploadValidator'], GlobalFactory.Src.UploadFiles.UploadFileApiFactory);

//-->process file
container.register('ProcessFileService', [], GlobalFactory.Src.ProcessFile.ProcessFileService);
container.register('ProcessFileApi', ['ProcessFileService'], GlobalFactory.Src.ProcessFile.ProcessFileApi);

//Src Index Note-- Please register all the apis before this line
container.register('SrcIndexFactory', ['server',

    'UploadApi', 'ProcessFileApi'], GlobalFactory.Src.SrcIndexFactory);

module.exports = container;