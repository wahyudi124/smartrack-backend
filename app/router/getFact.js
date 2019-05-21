const fs = require('fs')



exports.newValue = (data, device_type)=>{
    facts={};

    const raw = fs.readFileSync('newValue.json'); //json diganti data
    var yeah=JSON.parse(raw);

    device_type = 1;
    for ( i = 0; i< yeah.length; i++){
        nama = yeah[i].var_name+"_"+yeah[i].id_profile+"_"+device_type;
        value = yeah[i].value
        console.log(nama+"="+value)
        facts[nama]=value;
        allFact = JSON.stringify(facts);
    }

    

    fs.writeFile('allFact.json', allFact, err=>{
        if(err){
            console.log('Error : ', err)
        } else {
            console.log('Succesfully wrote file')
        }
    })
}