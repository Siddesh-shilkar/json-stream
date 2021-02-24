const readline = require('readline')
const fs = require('fs')


const rl = readline.createInterface({
    input: fs.createReadStream('./test.json')
    
})

rl.on('line', (data) => {
    let writeData = JSON.parse(data)
    let write = fs.createWriteStream('./writeTest.json', { 'flags': 'a', 'encoding': null, 'mode': 0666})
    write.write(writeData + '\n')
})