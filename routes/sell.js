console.log('343')
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const {authenticateToken ,secretKey }= require('../middleware/requireLogin');

console.log('guyg')
// Sell product route
router.post('/sell', authenticateToken, async (req, res) => {
  console.log('njj')
  const { title, description, price } = req.body;

  console.log(req.user.user_name)

  const seller = req.user.user_name; // Access the authenticated user ID from req.userf
  console.log('bju')
  try {
    const newProduct = new Product({ title, description, price, seller });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product', error);
    res.status(500).json({ message: 'Error creating product', error });
  }
});


router.get('/Products',authenticateToken,async(req,res)=>{
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

module.exports = router;