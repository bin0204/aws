const mongoose = require('mongoose');

// Define Schemes
const listSchema = new mongoose.Schema({
  instanceType: { type: String, default: 'protected'},
  instanceId: { type: String, default: 'protected'},
  imageId: { type: String, default: 'protected'},
  keyName: { type: String, default: 'protected'},
  privateIp: { type: String, default: 'protected'},
  az: { type: String, default: false }
},
{
  timestamps: true
});

//Find All
listSchema.statics.findAll = function() {
  return this.find({});
};

// Create Model & Export
module.exports = mongoose.model('List', listSchema);
