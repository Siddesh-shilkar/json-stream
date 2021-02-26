const fs = require('fs')

let buffer = '';

const processObj = (obj) => {
    try {
        if (obj[obj.length -1] === '/r') {
            obj = obj.substr(0, obj.length-1)
            // console.log(obj)
        }
        if (obj.length > 0) {
            let parsedObj = JSON.parse(JSON.stringify(obj));
            // console.log(typeof parsedObj, 'typeof parsedObj')
            let write = fs.createWriteStream('./writeTest.json', { 'flags': 'a', 'encoding': null, 'mode': 0666 })
            write.write(parsedObj)
        }
    } catch (err) {
        console.log(err)
    }
}


const processData = () => {
    let stringPosition;

    while((stringPosition = buffer.indexOf(`\n`)) >= 0) {
        if (stringPosition === 0) {
            buffer = buffer.slice(1);
            continue
        }

        // let stringifiedJson = JSON.stringify(buffer);
        // console.log(buffer.slice(0, stringPosition + 1), '<------- sliced buffer')
        let slicedBuffer = buffer.slice(0, stringPosition + 1)
        processObj(slicedBuffer)

        // buffer = ''
        buffer = buffer.slice(stringPosition+1)
    }
}


let dataStream = fs.createReadStream('test.json', {flags: 'r', encoding: 'utf-8'})

dataStream.on('data', (chunk) => {
    buffer += chunk.toString()
    processData() 
})