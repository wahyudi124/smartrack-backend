const fs = require('fs')

fs.readFile('all.json', (err,data) => {
    if (err) throw err;
    let datas = JSON.parse(data);

    let aw = JSON.parse(datas.Role[0])
    console.log(aw.event)
    // engine.addRole(datas.Role[0])
})