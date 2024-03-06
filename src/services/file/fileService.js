var xlsx = require("xlsx");
const fs = require("fs");
require('dotenv').config(); 
const {Configuration, OpenAIApi} = require("openai");

const apiKey = process.env.OPENAI_API_KEYa;

if (!apiKey) {
  throw new Error('Missing OPENAI_API_KEYa environment variable. Please set it before running the script.');
}

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);


async function TransformData(){
    var workbook = xlsx.readFile("src/shared/data-set.xlsx");
    var shet_name_list = workbook.SheetNames;
    var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[shet_name_list[0]]);

    for (const item of xlData){
        var object = `{"prompt": "${item.Question} ->", "completion": "${item.Answer} END"}`;
    
        await fs.appendFileSync("src/shared/data-set.jsonl", object, "utf-8", function(){})
        await fs.appendFileSync("src/shared/data-set.jsonl", "\r\n", "utf-8", function(){})

    }
}

async function UploadFile(){
    const response = await openai.createFile(fs.createReadStream("src/shared/data-set.jsonl"), "fine-tune");
    return response;
}



async function ListFiles(){
    const response = await openai.listFiles();
    return response;

}

module.exports = {
    TransformData,
    UploadFile,
    ListFiles
}