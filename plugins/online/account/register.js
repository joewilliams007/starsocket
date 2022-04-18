let fs = require('fs');

function register(message, res){

    var args = message.split(" ")  
    var id = res[0].user_id;
     		
    var registerMessage = args[1]+" "+id

    var dir = "./users/"+id

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.appendFile('./users/'+id+'/log.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      fs.appendFile('./users/'+id+'/inbox.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      fs.appendFile('./users/'+id+'/chatinbox.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      fs.appendFile('./users/'+id+'/plan1.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      fs.appendFile('./users/'+id+'/plan2.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      fs.appendFile('./users/'+id+'/plan3.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      fs.appendFile('./users/'+id+'/plan4.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      fs.appendFile('./users/'+id+'/plan5.txt', '', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
return registerMessage;
}
module.exports = register;