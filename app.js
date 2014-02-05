
/**
 * Module depencies.
 */
var express = require("express");
var path = require("path");
var router = require("./routes/router.js");
var db = require("./routes/controllers/database.js");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var crypto = require("crypto");
var fs = require("fs");
var app = express();

//put in for future https support
var options = {
	"key": fs.readFileSync("privatekey.pem"),
	"cert": fs.readFileSync("certificate.pem")
};

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.cookieParser("test"));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

//middleware to attach database instance to
app.use("/validation", function (req, res, next) {
	db.connectToDB(function (error, database) {
		if (error) {
			next(error);
		}
		else {
			next();
		}
	});
});

//Used for establishing session support
passport.use(new LocalStrategy({
	"usernameField": "Email",
	"passwordField": "Password"
},
  function(username, password, done) {
    db.find({ "Email": username, "Password": password }, function (err, user, info) {
    	if (user) {
	      user.id = user._id;
	      done(err, user, "Succesfully Authenticated!");
	  	} else {
	  		done(err, null, "No User found!");
	  	}
    });
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.find({"_id": id}, function (err, user) {
    done(err, user);
  });
});

app.use("/create", function (req, res, next) {
	db.connectToDB(function (error, database) {
		if (error) {
			next(error);
		}
		else {
			next();
		}
	});
});


// development only
if ("development" == app.get("env")) {
  app.use(express.errorHandler());
}

app.get("/", function (req, res) {
	router.route(req, res, "home");
});

app.get("/create", function (req, res) {
	router.route(req, res, "home");
});

app.post("/main", function(req, res, next) {
  passport.authenticate("local", {"session": true}, function(err, user, info) {
    if (err) { 
    	return next(err);
    }
    if (!user) { 
    	return res.redirect("/");
    }
    req.logIn(user, function(err) {
      if (err) { 
      	return next(err); 
      }
      var minute = 500000;
      res.cookie("loggedIn", {"Email": user.Email}, {"maxAge": minute});
      return router.route(req, res, "main", {"Email": user.Email});
    });
  })(req, res, next);
});

app.get("/main", function (req, res) {
	if (req.cookies.loggedIn) {
		return router.route(req, res, "main", {"Email": req.cookies.loggedIn.Email});
	} else {
		return res.redirect("/");
	}
});

app.post("/create", function (req, res) {
	var User = {
		Email: req.body.Email,
		Password: req.body.Password
	};

	db.insertIntoDB(User, function(err) {
		if (err) {
			res.send(res.statusCode);
			console.log(err);
		}
		router.route(req, res, "home");
	});
	res.send(res.statusCode);
});

app.post("/validation", function (req, res) {
	db.checkExists({"Email": req.body.Email}, function(err, acct) {
                if (err) {
                        res.send(500, {Error: "Something went wrong!"});
                        return;
                }
                res.json(200, acct);
        });
});

app.post("/logout", function (req, res) {
	req.logOut();
	res.clearCookie("loggedIn");
	res.redirect("/");
});

//starts the server
app.listen(app.get("port"), function() {
	console.log("Server is listening on port: " + app.get("port"));
});
