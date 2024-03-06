const fileService = require("../services/file/fileService");

async function Test (req, res){
    res.send("test ok");
}


async function TransformData (req, res){
    await fileService.TransformData();
    res.send();
}

async function UploadFile (req, res){
    const response = await fileService.UploadFile();
    res.status(response.status).send(response.data);
}

async function ListFiles (req, res){
    const response = await fileService.ListFiles();
    res.status(response.status).send(response.data);
}

async function RetrieverFile (req, res){
    var fileId = req.query["fileId"];
    const response = await fileService.RetrieverFile(fileId)
    if(response == "fileId not found")
        res.status(404).send(response);

    res.status(response.status).send(response.data);
}

async function DeleteFile (req, res){
    var fileId = req.query["fileId"];
    const response = await fileService.DeleteFile(fileId)
    if(response == "fileId not found")
        res.status(404).send(response);

    res.status(response.status).send(response.data);
}



module.exports = {
    Test,
    TransformData,
    UploadFile,
    ListFiles,
    RetrieverFile,
    DeleteFile
}