
/**
* Name: group 3 
* Date: 17th November 2023
* Description: assests for users 
 */
import config from '../config/config.js' 
const express = require("express");
const router = express.Router();
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
const videoRegex = /\/.+\.(mp4|ogv)$/
router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `${config.baseURL}:${config.baseURL}/src${filePath}`);
});
router.get(videoRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `${config.baseURL}:${config.baseURL}/src${filePath}`);
});
module.exports = router;