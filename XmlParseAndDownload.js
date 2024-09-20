const fs = require('fs');


// Path to your local XML file
const xmlFilePath = 'C:/Users/hamzaa/Desktop/kod/xmlFile.xml';

// Read the contents of the XML file
fs.readFile(xmlFilePath, 'utf8', (err, xmlData) => {
  if (err) {
    console.error('Error reading XML file:', err);
    return;
  }

  // Proceed with your XML parsing and image downloading logic here
  console.log(xmlData[0]);

});