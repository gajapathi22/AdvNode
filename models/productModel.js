const mongoose = require('mongoose');
// const userModel = require('./userModel')
console.log('iufiu')
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seller: {
    type: String,
    
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;