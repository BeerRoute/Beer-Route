// Express is the web framework 
var express = require('express');
var pg = require('pg');
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
  app.use(allowCrossDomain);
});


app.use(express.bodyParser());


// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that 
// identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with REST 
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple values (Database read Operation)
// c) PUT - Update an individual object, or collection  (Database update operation)
// d) DELETE - Remove an individual object, or collection (Database delete operation)

//REST Operation - HTTP GET to read arbitrary OK response
app.get('/ClassDemo3Srv/ok', function(req,res){
	console.log("GET OK");
	var response = {Message : "OK"};
	res.json(response);

});

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'BeerRoute_1', //env var: PGDATABASE
  password: 'Miflaquis15', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var conStringPri = 'postgres://' + config.user + ':' + config.password + '@' + config.host + 
    '/postgres';
var conStringPost = 'postgres://' + config.user + ':' + config.password + '@' + config.host + 
    '/' + config.database;

//pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
//    if (err)
//        console.log('Error while connecting: ' + err); 
//    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
//        if (err) 
//            console.log('ignoring the error. DB already exists'); // ignore if the db is there
//        client.end(); // close the connection

        // create a new connection to the new db
        //pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
        //    clientOrg.query('CREATE TABLE IF NOT EXISTS ' + tableName + ' ' +
        //            '(...some sql...)';
        //});
//    });
//});

app.get('/ClassDemo3Srv/login', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = {Exists : exists,
		username : '',
		email : '',
		region : ''};
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT username, email, region, password FROM users natural join regularuser", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
    		q.on('row', function(row){
		console.log(row);
		if((req.query.email == row.email) && (req.query.password == row.password)){
			exists = true;
			console.log("name exists " + exists);
			response.username = row.username;
			response.email = row.email;
			response.region = row.region;
			response.password = row.password;}
		});
		q.on('end', function(result){
		response.Exists = exists;
		res.json(response);
		});
	    });
        });
    });
});

app.get('/ClassDemo3Srv/signup', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = {Exists : exists};
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT username, email FROM users", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
		console.log('New username: ' + req.query.username);
    		q.on('row', function(row){
		console.log(row);
		if((req.query.email == row.email) || (req.query.username == row.username)){
			exists = true;
			console.log("name exists " + exists);}
		});
		q.on('end', function(result){
		response = {Exists : exists};
		res.json(response);
		});
	    });
        });
    });
});
//////////////////////////////////////////////////////////////////////////////////
app.get('/ClassDemo3Srv/getbeer', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = [];
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT beerid, beername, description, path FROM beer", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
	    });
        });
    });
});
///////////////////////////////////

app.get('/ClassDemo3Srv/getwishlist', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = [];
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT beerid, beername, description, path FROM wishlist natural inner join beer natural inner join regularuser", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
	    });
        });
    });
});

///////////////////////////////////

app.get('/ClassDemo3Srv/getbusiness', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = [];
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT businessname, address, region, description, path FROM business", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
	    });
        });
    });
});

app.get('/ClassDemo3Srv/getbusinessreview', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = [];
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT rating, rdate, comment, username FROM businessratng", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
	    });
        });
    });
});

app.get('/ClassDemo3Srv/getbeerreview', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = [];
pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
    if (err)
        console.log('Error while connecting: ' + err); 
    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
        if (err) 
            console.log('ignoring the error. DB already exists'); // ignore if the db is there
        client.end(); // close the connection

	
        // create a new connection to the new db
        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT rating, rdate, comment, username FROM beerratng", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);}
            });
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
	    });
        });
    });
});

// Server starts running when listen is called.
app.listen(process.env.PORT || 3412);
console.log("server listening");
//pg.connect(conStringPri, function(err, client, done) { // connect to postgres db
//    if (err)
//        console.log('Error while connecting: ' + err); 
//    client.query('CREATE DATABASE ' + config.database, function(err) { // create user's db
//       if (err) 
//            console.log('ignoring the error. DB already exists'); // ignore if the db is there
//       client.end(); // close the connection
	
//        // create a new connection to the new db
//       pg.connect(conStringPost, function(err, clientOrg, done) {
//            // create the table
//            var q = clientOrg.query('SELECT * FROM student natural join takes', function(err){

//	if(err){
//	    console.log('Error connecting to the table');
//	    console.log(err);}
//            });
//    		q.on('row', function(row){
//		console.log(row);
//		});
//	});
//    });
//});

