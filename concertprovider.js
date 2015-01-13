var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ConcertProvider = function(host, port) {
  // this.db= new Db('node-mongo-concert', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db= new Db('node-mongo-concert', new Server(host, port, {w: 1}), {safe: false});
  this.db.open(function(){});
};


ConcertProvider.prototype.getCollection= function(callback) {
  this.db.collection('concerts', function(error, concert_collection) {
    if( error )
    {
      console.log("ERROR: " + error);
      callback(error);
    }
    else
    {
      callback(null, concert_collection);
    }
  });
};

//find all concerts
ConcertProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, concert_collection) {
      if( error ) callback(error)
      else {
        concert_collection.find().toArray(function(error, results) {
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


//find all concerts
ConcertProvider.prototype.find = function(query, callback) {
    this.getCollection(function(error, concert_collection) {
      if( error ) callback(error)
      else {
        concert_collection.find(query).toArray(function(error, results) {
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

//save new concert
ConcertProvider.prototype.save = function(concerts, callback) {
    this.getCollection(function(error, concert_collection) {
      if( error ) callback(error)
      else {
        if( typeof(concerts.length)=="undefined")
          concerts = [concerts];

        for( var i =0;i< concerts.length;i++ ) {
          concert = concerts[i];
          concert.created_at = new Date();
        }

        concert_collection.insert(concerts, function() {
          callback(null, concerts);
        });
      }
    });
};

//save new concert
ConcertProvider.prototype.dropDatabase = function(callback) {
  this.db.dropDatabase(function(error, result) {
    if( error )
      callback(error)
    else
      callback(null);
  });
};

exports.ConcertProvider = ConcertProvider;