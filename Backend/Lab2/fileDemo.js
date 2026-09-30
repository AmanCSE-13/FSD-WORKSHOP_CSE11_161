import fs from "node:fs/promises"
const filePath = "userData.txt";
async function createFile(content){
    try{
    await fs.writeFile(filePath,content,"utf8")
    console.log("File created successfully!!")
    }
    catch(error){
        console.log(error)
    }
}
async function readFile(){
    try{
    const content =  await fs.readFile(filePath, "utf8");
    console.log(content)
    }
    catch(error){
        console.log(error)
    }
}
async function append(data){
    try{
        await fs.appendFile(filePath,data,"utf8");
        console.log("File updated successfully!!")
    }
    catch(error){
        console.log(error)
    }
}
async function deleteFile(){
    try{
        await fs.unlink(filePath);
        console.log("File deleted successfully!!")
    }
    catch(error){
        console.log(error)
    }
}
async function run(){
    await createFile("Hello world\n")
    await append("Continue writing")
    await readFile()
    deleteFile()
}

run()