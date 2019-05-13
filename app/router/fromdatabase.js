var database;

// Role.findAll({attributes : ['roleallcondition']
// }).then(data =>{
//     var halo = JSON.parse(data[0].roleallcondition);
//     console.log(halo)
//     return 
// })


// module.exports = {

//     getdatabase: ()=> {
//         var db = require('../config/db.config');
//         var Role = db.role_backend;


//         Role.findAll({attributes : ['roleallcondition']
//         }).then(data =>{
//             var halo = JSON.parse(data[0].roleallcondition);
//             console.log(halo)
//             return database= halo;
//         })
//     }
// }


const fs = require('fs')
var db = require('../config/db.config');
var Role = db.role_backend;
var jsonfile = require('./jsonfile.js')
const all = {};
const allRole = "Role";
all[allRole]= [];

// const getdatabase = ()=>{
    Role.findAll({attributes : ['roleallcondition']
    }).then(data =>{
        console.log(all)
        var semua = data[0].roleallcondition;
        console.log(semua)
        all[allRole].push(semua)
        halo = JSON.stringify(all);
        console.log(halo)
        // var ali = all[allRole].push(halo)
        const dat = JSON.stringify(all)
        // console.log(dat)

        
        fs.writeFile('all.json', dat, err => {
            if (err){
                console.log('Error : ', err)
            } else {
                console.log('Succesfully wrote file')
            }
        })
       
    })
// }







// const getdatabase =()=>{
// Role.findAll({attributes : ['roleallcondition']
//     }).then(data =>{
//         // var halo = JSON.parse(data[0].roleallcondition);
//         console.log(halo)
//         // const dat = JSON.stringify(data)
//         // fs.writeFile('all.json', dat, err => {
//         //     if (err) {
//         //         console.log('Error writing file', err)
//         //     } else {
//         //         console.log('Succesfully wrote file')
//         //     }
//         // })
//         // returdatabase= halo;
//         jsonfile.set(halo)
//         jsonfile.get()
//         // console.log(jsonfile.get())
//     })
// }



// console.log(jsonfile.get)

// getdatabase= jsonfile.get;

// jsonfile.get(getdatabase())



// module.exports = getdatabase;


// const fs = require('fs')

// const customer = {
//     name: "Newbie Co.",
//     order_count: 0,
//     address: "Po Box City",
// }

// const data = JSON.stringify(customer)
// fs.writeFile('all.json', data, err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Succesfully wrote file')
//     }
// })

