var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PostProvider = function(host, port) {
  // this.db= new Db('node-mongo-post', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db= new Db('node-mongo-post', new Server(host, port, {w: 1}), {safe: false});
  this.db.open(function(){});
};


PostProvider.prototype.getCollection= function(callback) {
  this.db.collection('posts', function(error, post_collection) {
    if( error )
    {
      console.log("ERROR: " + error);
      callback(error);
    }
    else
    {
      callback(null, post_collection);
    }
  });
};

//find all posts
PostProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, post_collection) {
      if( error ) callback(error)
      else {
        post_collection.find().toArray(function(error, results) {
          if( error )
          {
            console.log("ERROR: " + error);
            callback(error);
          }
          else {
            callback(null, results);
          }
        });
      }
    });
};


//find all posts
PostProvider.prototype.find = function(query, callback) {
    this.getCollection(function(error, post_collection) {
      if( error ) callback(error)
      else {
        post_collection.find(query).toArray(function(error, results) {
          if( error )
          {
            console.log("ERROR: " + error);
            callback(error);
          }
          else {
            callback(null, results);
          }
        });
      }
    });
};

//save new post
PostProvider.prototype.save = function(posts, callback) {
    this.getCollection(function(error, post_collection) {
      if( error ) callback(error)
      else {
        if( typeof(posts.length)=="undefined")
          posts = [posts];

        for( var i =0;i< posts.length;i++ ) {
          post = posts[i];
          post.created_at = new Date();
        }

        post_collection.insert(posts, function() {
          callback(null, posts);
        });
      }
    });
};

//save new post
PostProvider.prototype.dropDatabase = function(callback) {
  this.db.dropDatabase(function(error, result) {
    if( error )
      callback(error)
    else
      callback(null);
  });
};

exports.PostProvider = PostProvider;