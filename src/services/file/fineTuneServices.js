const fs = require("fs");
require('dotenv').config(); 
const {Configuration, OpenAIApi} = require("openai");

const apiKey = process.env.OPENAI_API_KEYa;

if (!apiKey) {
  throw new Error('Missing OPENAI_API_KEYa environment variable. Please set it before running the script.');
}

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);


async function CreateFineTune(fileId){
    
    try{
        const response = await openai.createFineTune({
            training_file: fileId,
            model: "babbage-002",
            suffix: "question-answer-01"
        });
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}


async function ListFineTune(){
    
    try{
        const response = await openai.listFineTunes();
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}

async function RetrieveFineTune(fineTuneId){
    
    try{
        const response = await openai.retrieveFineTune(fineTuneId);
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}

async function CancelFineTune(fineTuneId){
    
    try{
        const response = await openai.cancelFineTune(fineTuneId);
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}

async function DeleteModelFineTune(model){
    
    try{
        const response = await openai.deleteModel(model);
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}


module.exports = {
    CreateFineTune,
    ListFineTune,
    RetrieveFineTune,
    CancelFineTune,
    DeleteModelFineTune
}