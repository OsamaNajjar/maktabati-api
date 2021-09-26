var Connection = require('tedious').Connection;

var config = {
            server: process.env.DB_SERVER, 
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
     };

     console.log(config);

var connection = new Connection (config);

connection.on('connect', function(err){
    console.log(err);
    if(err!=null){
         console.log("not connected");
    }
    else{  
          console.log("Connected")
          connection.close();
    };
});