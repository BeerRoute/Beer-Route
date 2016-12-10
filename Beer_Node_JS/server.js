// Express is the web framework 
var express = require('express');
var nodemailer = require('nodemailer');
var pg = require('pg');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var transporter;

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

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   app.use(allowCrossDomain);
}

app.use(bodyParser.json());


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
  password: '', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var conStringPri = 'postgres://' + config.user + ':' + config.password + '@' + config.host + 
    '/postgres';
var conStringPost = 'postgres://' + config.user + ':' + config.password + '@' + config.host + 
    '/' + config.database;
	
var text = 'Hello. Thank you for creating an account in Beer Route. Please confirm your account by logging in \n\n' + 'http://localhost:8100/#/intro/auth-login';

var mailOptions = {
    from: 'beer.route2016@gmail.com', // sender address
    to: '', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

app.get('/ClassDemo3Srv/login', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = {Exists : exists,
		username : '',
		email : '',
		region : ''};

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT username, email, password, picture, isbusinessowner  FROM users", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}
 
		done();
		
	});
    		q.on('row', function(row){
		console.log(row);
		if((req.query.email == row.email) && (req.query.password == row.password)){
			exists = true;
			console.log("name exists " + exists);
			response.username = row.username;
			response.email = row.email;
			//response.region = row.region;
			response.password = row.password;
			response.picture = row.picture;
			response.isbusinessowner = row.isbusinessowner;
			};
		});
		q.on('end', function(result){
		response.Exists = exists;
		res.json(response);
		});
	    });
        //});
    });


app.get('/ClassDemo3Srv/signup', function(req,res){
console.log("GET TEST QUERY");
console.log(req.query);
var exists = false;
var response = {Exists : exists};

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT username, email FROM users", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
	});
		console.log('New username: ' + req.query.username);
    		q.on('row', function(row){
		console.log(row);
		if((req.query.email == row.email) || (req.query.username == row.username)){
			exists = true;
			console.log("name exists " + exists);}
		}); //End q.onRow
		q.on('end', function(result){
		response = {Exists : exists};
		res.json(response);
		});
	    });	//End Connect

    });//END Get

//////////////////////////////////////////////////////////////////////////////////
app.get('/ClassDemo3Srv/addUser', function(req,res){
console.log("GET Add User");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("INSERT INTO users (username, email,password, isbusinessowner) VALUES ('"+req.query.username+"','"+req.query.email+"','"+req.query.password+"',"+req.query.isbusinessowner+")", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}
		done();
	});
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		console.log("Sending Message");
		var transporter = nodemailer.createTransport({
        	service: 'Gmail',
       		auth: {user: 'beer.route2016@gmail.com', // Your email id
            	pass: 'Beer_Craft2016'} // Your password
    		});
		mailOptions.text = 'Hello. Thank you for creating an account in Beer Route. Please confirm your account by logging in \n\n' + 'http://localhost:8100/#/intro/auth-login';
		mailOptions.to = req.query.email
		transporter.sendMail(mailOptions, function(error, info){
    		if(error){
       		console.log(error);

    		}else{
        	console.log('Message sent: ' + info.response);

    		};
		});
		res.json(response);
		});
	    });

    });

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.get('/ClassDemo3Srv/businessInfo', function(req,res){
console.log("POST business Info");
console.log(req.body);
var exists = false;
var response = [];
        pg.connect(conStringPost, function(err, clientOrg, done) {
            
            var q = clientOrg.query("INSERT INTO business (businessname, address, region, description) VALUES ('"+req.query.businessname+"','"+req.query.address+"','"+req.query.region+"','"+req.query.description+"')", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}
		done();
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

//*******************************************************************
app.get('/ClassDemo3Srv/businessownerInfo', function(req,res){
console.log("POST business owner Info");
console.log(req.body);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {
            console.log(req.query);
            var q = clientOrg.query("INSERT INTO businessowner (username, creditcard, ccexp, businessid) VALUES ('"+req.query.username+"',"+req.query.creditcard+",'"+req.query.ccexp+"',"+req.query.businessid+")", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//*******************************************************************
app.get('/ClassDemo3Srv/getbusinessID', function(req,res){
console.log("POST business owner Info");
console.log(req.body);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {
            console.log(req.query);
            var q = clientOrg.query("SELECT businessid FROM business WHERE businessname='"+req.query.businessname+"'", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




app.get('/ClassDemo3Srv/getbeer', function(req,res){
console.log("GET BEER QUERY");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT beerid, beername, beerStyle, description, path FROM beer", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();		
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



app.get('/ClassDemo3Srv/wishBeer', function(req,res){
console.log("Wish Beer");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("INSERT INTO wishlist (username, beerid) VALUES ('"+req.query.username+"',"+req.query.beerid+")", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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


//*************************************************
app.get('/ClassDemo3Srv/getreviews', function(req,res){
console.log("GET BEER REVIEW QUERY");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT picture, beerid, rating, comment, rdate, username FROM beer natural inner join beerrating natural inner join users WHERE beerid = " + req.query.id, function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}
		done();
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
///////////////////////////////////

//#############################################################
app.get('/ClassDemo3Srv/addReview', function(req,res){
console.log("POST Add Review");
console.log(req.body);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {
            
            var q = clientOrg.query("INSERT INTO businessrating (businessid, rating, comment, rdate,  username) VALUES ("+req.query.id+",'"+req.query.rating+"','"+req.query.comment+"','"+req.query.rdate+"','"+req.query.username+"')", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/ClassDemo3Srv/addBeerReview', function(req,res){
console.log("POST Add Beer Review");
console.log(req.body);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {
            
            var q = clientOrg.query("INSERT INTO beerrating (beerid, rating, comment, rdate,  username) VALUES ("+req.query.beerid+",'"+req.query.rating+"','"+req.query.comment+"','"+req.query.rdate+"','"+req.query.username+"')", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

app.get('/ClassDemo3Srv/addFeedPost', function(req,res){
console.log("POST Add new Feed");
console.log(req.body);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {
            
            var q = clientOrg.query("INSERT INTO newsfeed (description, businessid) VALUES ('"+req.query.description+"',"+req.query.businessid+")", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

app.get('/ClassDemo3Srv/getbusinessuser', function(req,res){
console.log("GET BUSINESS USER INFO QUERY");
console.log(req.query);
var exists = false;
var response = [];
	

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT username, creditcard, ccexp, businessid, ownerid FROM businessowner WHERE username='"+req.query.username+"'", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}
           
		done();
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


//#############################################################

app.get('/ClassDemo3Srv/getwishlist', function(req,res){
console.log("GET WISH QUERY");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT beerid, beername, description, path FROM wishlist natural inner join beer natural inner join users WHERE username='"+req.query.username+"'", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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

///////////////////////////////////

app.get('/ClassDemo3Srv/getbusiness', function(req,res){
console.log("GET BUSINESS QUERY");
console.log(req.query);
var exists = false;
var response = {};
response.products = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {
            // create the table
            var q = clientOrg.query("SELECT businessname, address, region, description, path, businessid FROM business", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
});
		q.on('row', function(row){
		console.log(row);
		response.products.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
		
	    });
    });


app.get('/ClassDemo3Srv/getbusinessreview', function(req,res){
console.log("GET BUSINESS REVIEW QUERY");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT picture, businessid, ratingid, rdate, comment, username FROM businessrating natural inner join users WHERE businessid = " + req.query.id, function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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


app.get('/ClassDemo3Srv/getbeerreview', function(req,res){
console.log("UNUSED QUERY");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT rating, rdate, comment, username FROM beerratng", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
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


app.get('/ClassDemo3Srv/getevents', function(req,res){
console.log("GET EVENTS QUERY");
console.log(req.query);
var exists = false;
var response = {};
response.products = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("SELECT path, newsfeed.description, businessname, business.businessid, event_id, event_name FROM newsfeed, business WHERE newsfeed.businessid=business.businessid ORDER BY event_id desc", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
	});
		q.on('row', function(row){
		console.log(row);
		response.products.push(row);
		});
		q.on('end', function(result){
		res.json(response);
		});
		
	    });

    });


app.get('/ClassDemo3Srv/makePayment', function(req,res){
console.log("GET Add Transaction");
console.log(req.query);
var exists = false;
var response = [];

        pg.connect(conStringPost, function(err, clientOrg, done) {

            var q = clientOrg.query("INSERT INTO transaction (ownerid, amount, creditcard) VALUES ('"+req.query.ownerid+"','"+15.00+"','"+req.query.creditcard+"')", function(err){
	if(err){
	    console.log('Error connecting to the table');
	    console.log(err);
	}

		done();
	});
		q.on('row', function(row){
		console.log(row);
		response.push(row);
		});
		q.on('end', function(result){
		console.log("Sending Message");
		var transporter = nodemailer.createTransport({

        	service: 'Gmail',
       		auth: {user: 'beer.route2016@gmail.com', // Your email id
            	pass: 'Beer_Craft2016'} // Your password
    		});
		mailOptions.to = req.query.email;
		mailOptions.text = 'Membership payment successfully processed. Thank you for your continued support of Beer Route';
		transporter.sendMail(mailOptions, function(error, info){
    		if(error){
       		console.log(error);
    		}else{
        	console.log('Message sent: ' + info.response);
    		};
		});
		res.json(response);
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

