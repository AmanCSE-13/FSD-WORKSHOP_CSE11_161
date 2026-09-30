import fs from "node:fs/promises"

const filePath = "userData.json"

async function createFile(data) {
    try {
        await fs.writeFile(
            filePath,
            JSON.stringify(data,  null, 2),
            "utf8"
        )
        console.log("File created successfully")
    }
    catch (err) {
        console.log(err)
    }
}

async function readFile() {
    try {
        const content = await fs.readFile(filePath, "utf8")
        const data = JSON.parse(content)
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
}

async function appendFile(data) {
    try {
        const content = await fs.readFile(filePath, "utf8")
        const existingData = JSON.parse(content)

        existingData.push(data)

        await fs.writeFile(
            filePath,
            JSON.stringify(existingData, null, 2),
            "utf8"
        )
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteFile() {
    try {
        await fs.unlink(filePath)
        console.log("File deleted successfully")
    }
    catch (err) {
        console.log(err)
    }
}

async function run() {
    await createFile([
        {
            name: "Aman",
            age: 19
        }
    ])

    await readFile()

    await appendFile({
        name: "Alok",
        age: 20
    })

    await readFile()

    //await deleteFile()
}

run()