const fs = require('fs');
const https = require('https')
const xml2js = require('xml2js');
const axios = require('axios');
const path = require('path');


let stockCodes = []
let imageUrls = []

// Path to your local XML file
const xmlFilePath = 'C:/Users/hamzaa/Desktop/kod/abmYayin.xml';

// Read the XML file
fs.readFile(xmlFilePath, 'utf-8', (err, xmlData) => {
  if (err) {
    console.error('Error reading XML file:', err);
    return;
  }

  try {
    // Parse XML to JSON
    xml2js.parseString(xmlData, (parseErr, result) => {
      if (parseErr) {
        console.error('Error parsing XML:', parseErr);
        return;
      }

      // Access the array of items
      const itemsArray = result.Products.Product
    //   Item[0].ImagePath[0];

    itemsArray.forEach(item => {

        const stockCode = item.Barcode[0]
        const imageUrl = item.Image1[0]

        downloadImages(imageUrl, `${stockCode}.jpg`, "C:/Users/hamzaa/Desktop/kod/abmYayin")
    });
      // itemsArray is now an array of objects representing each item
      // You can access and manipulate the array as needed
    //   console.log(itemsArray);
    });
  } catch (error) {
    console.error('Error occurred while parsing XML:', error);
  }
});


  async function downloadImages(imageUrl, name, downloadDir) {
    try {
      // Create the download directory if it doesn't exist
      fs.mkdirSync(downloadDir, { recursive: true });
  
      // Download each image
        const fileName = `${name}`; // Generate a unique file name for each image
        const filePath = path.join(downloadDir, fileName);
  
        const response = await axios({
          url: imageUrl,
          method: 'GET',
          responseType: 'stream'
        });
  
        response.data.pipe(fs.createWriteStream(filePath));
  
        console.log(`Downloaded ${fileName}`);
    } catch (error) {
      console.error('Error downloading images:', error);
    }
  }