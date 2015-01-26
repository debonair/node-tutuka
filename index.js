var Q = require('q');
var xmlrpc = require('xmlrpc');
var crypto = require('crypto');
var dateFormat = require('dateformat');

/**
 * Creates the Tutuka object to make the API calls
 *
 * @constructor
 * @param {Object} options        - an object with fields:
 *   - {String} terminalID
 *   - {String} host
 *   - {Number} port
 *   - {String} path
 * @return {Tutuka}
 */

function Tutuka(config, logger){
  this.terminalID = config.terminalID;
  this.terminalPassword = config.terminalPassword;
  this.host = config.host;
  this.port = config.port;
  this.path = config.path;
  this.log = logger.child({class: 'tutuka_api'});
  this.xmlrpc = xmlrpc.createClient({host: this.host, port: this.port, path: this.path});
}


Tutuka.prototype.checksum = function(method, arguments){
  if(arguments.length > 0){
    var concat = '';
    for(var i=0; i < arguments.length; i++){
      concat += arguments[i];
    }
    var string = method + this.terminalID + concat;
    var checksum = crypto.createHmac('sha1', this.terminalPassword).update(string).digest('hex');
    return checksum;
  }

}

Tutuka.prototype.execute = function(method, arguments, callback){
  this.xmlrpc.methodCall(method, arguments, function(err, value){
    if(err){
      callback(err);
    } else {
      callback(null, value);
    }
  }.bind(this));
}

// Retrieve the balance of a card
Tutuka.prototype.balance = function(profileNumber, cardNumber, transactionId){
  var deferred = Q.defer();

  var method = 'Balance';
  var now = new Date();
  var transactionDate = dateFormat(now, 'yyyymmdd') + 'T' + dateFormat(now, 'HH:MM:ss');
  var checksum = this.checksum(method, [profileNumber, cardNumber, transactionId, transactionDate]);
  var arguments = [this.terminalID, profileNumber, cardNumber, transactionId, now, checksum];
  var duh = this.execute(method, arguments, function(err, value){
    if(err){
      deferred.reject(err);
    }
    deferred.resolve(value);
  });

  return deferred.promise;
}

// Allocate card to a user
Tutuka.prototype.allocateCard = function (){

}

// Link a card to a profile
Tutuka.prototype.linkCard = function(){

}

// Link multiple cards to a profile using a range of sequence numbers
Tutuka.prototype.linkCardsBySequenceRange = function(){

}

// Deduct amount from card and load profile
Tutuka.prototype.deductCardLoadProfile = function(){

}

// Load a card with the requested amount and deduct from profile
Tutuka.prototype.loadCardDeductProfile = function(){

}

// Transfer funds from one card to another
Tutuka.prototype.transferFunds = function(){

}

// Register a new profile
Tutuka.prototype.register = function(emailAddress, firstName, lastName, idOrPassportNumber, contactNumber, cellphoneNumber, isCompany, vatNumber, companyName, companyCCNumber, addressLine1, addressLine2,  city, postalCode, transactionId){
  var deferred = Q.defer();

  var method = 'Register';
  var now = new Date();
  var transactionDate = dateFormat(now, 'yyyymmdd') + 'T' + dateFormat(now, 'HH:MM:ss');
  var checksum = this.checksum(method, [emailAddress, this.terminalPassword, firstName, lastName, idOrPassportNumber, contactNumber, cellphoneNumber, isCompany, vatNumber, companyName, companyCCNumber, addressLine1, addressLine2,  city, postalCode, transactionId, transactionDate]);
  var arguments = [this.terminalID, emailAddress, this.terminalPassword, firstName, lastName, idOrPassportNumber, contactNumber, cellphoneNumber, isCompany, vatNumber, companyName, companyCCNumber, addressLine1, addressLine2,  city, postalCode, transactionId, now, checksum];
  try {
    var duh = this.execute(method, arguments, function (err, value) {
      if (err) {
        console.log('rejecting');
        deferred.reject(err);
      }
      deferred.resolve(value);
    });
  } catch(e) {
    console.log(e);
  }
  return deferred.promise;
}

// Update a profile
Tutuka.prototype.updateProfile = function(){

}

// Get the full statement of a card
Tutuka.prototype.statement = function(){
}

// Get the statement for a date range
Tutuka.prototype.statementByDateRange = function(){

}

// Activate a card
Tutuka.prototype.activate = function(){

}

// Stop a card
Tutuka.prototype.stopCard = function(){

}

// Updates the cellphone or id number linked to a card
Tutuka.prototype.updateAllocatedCard = function(){

}

// Retrieves the current status of a card
Tutuka.prototype.status = function(){

}

// Un-stop a card
Tutuka.prototype.cancelStopCard = function(){

}

// Check if an amount was deducted from a profile
Tutuka.prototype.checkAuthorisation = function(){

}

// Check whether a specified amount was loaded onto a card
Tutuka.prototype.checkLoad = function(){

}

module.exports = function(config, logger){
  return new Tutuka(config, logger);
}