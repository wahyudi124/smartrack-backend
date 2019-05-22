// var myPythonScriptPath = 'my_script.py';

// // Use python shell
// var ps = require('python-shell');
// var pyshell = new PythonShell(myPythonScriptPath);

// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };

//     console.log('finished');
// });

var python = require('python-shell');

let options = {
  mode: 'text',
  // pythonPath: 'path/to/python',
  // pythonOptions: ['-u'], // get print results in real-time
  // scriptPath: 'path/to/my/scripts',
  // args: ['--id', '3', '--Type', 'AO' ,'--Port', '5'  , '--Value', '4.9']
  args: ['--eq_type', 'PDU', '--eq_id', '1', '--varname', 'outlet_1_status', '--value', '1']

};



python.PythonShell.run('Control_Equipment.py', options, function (err, data) {
    if (err) throw err;
    console.log(data);
});