var xmlrpc = require('xmlrpc');
var crypto = require('crypto');
var dateFormat = require('dateformat');
var Q = require('q');

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

function Tutuka(config){
  this.terminalID = config.terminalID;
  this.host = config.host;
  this.port = config.port;
  this.path = config.path;

  this.xmlrpc = xmlrpc.createClient({host: this.host, port: this.port, path: this.path});
}

Tutuka.prototype.test = function(){
  console.log(this.path);
}

Tutuka.prototype.checksum = function(method, profileNumber, cardNumber, transactionId, transactionDate){
  return crypto.createHmac('sha1', '2DE27DF91E').update(method + this.terminalID + profileNumber + cardNumber + transactionId + transactionDate).digest('hex');
}

// Delete this at some stage
function dump(obj) {
  var out = '';
  for (var i in obj) {
    out += i + ": " + obj[i] + "\n";
  }
  return out;
}

Tutuka.prototype.execute = function(method, arguments){
  console.log('Executing...');
  var deferred = Q.defer();
  this.xmlrpc.methodCall(method, arguments, function(err, value){
    if(err){
      deferred.reject(err);
    } else {
      deferred.resolve(value);
    }
  });
  return deferred.promise;
}


// Retrieve the balance of a card
Tutuka.prototype.balance = function(profileNumber, cardNumber, transactionId){
  var method = 'Balance';
  var now = new Date();
  var transactionDate = dateFormat(now, 'yyyymmdd') + 'T' + dateFormat(now, 'H:MM:s');
  var checksum = this.checksum(method, profileNumber, cardNumber, transactionId, transactionDate);
  var arguments = [this.terminalID, profileNumber, cardNumber, transactionId, now, checksum];
  return this.execute(method, arguments);
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
Tutuka.prototype.register = function(){

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

module.exports = Tutuka;