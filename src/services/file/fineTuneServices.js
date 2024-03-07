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
            suffix: "question-answer-01",
        });
        return response;
    }catch(e){
        return {status: 400, data: e};
    }
}

module.exports = {
    CreateFineTune,
}