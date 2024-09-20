const fs = require('fs');
const axios = require('axios');
const path = require('path');
const ExcelJS = require('exceljs');

// Path to your Excel file
const excelFilePath = 'C:/Users/hamzaa/Desktop/altinKitap_XML.xlsx';

// Read Excel file
async function readExcel() {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(excelFilePath);

        // Assuming the image URLs are in a column named "ns1:image"
        const worksheet = workbook.getWorksheet(1);
        const imageColumnIndex = getColumnIndex(worksheet, "ns1:image");
        const stockCodeColumnIndex = 1; // Assuming stock codes are in column A

        if (imageColumnIndex !== -1) {
            worksheet.eachRow((row) => {
                const stockCode = row.getCell(stockCodeColumnIndex).value;
                const imageUrl = row.getCell(imageColumnIndex).value;
                if (imageUrl && stockCode) {
                    const fileName = `${stockCode}.jpg`; // Using stock code as image name
                    downloadImage(imageUrl, fileName);
                }
            });
        } else {
            console.error("Column 'ns1:image' not found in the Excel file.");
        }
    } catch (error) {
        console.error('Error reading Excel file:', error);
    }
}

// Function to get column index by name
function getColumnIndex(worksheet, columnName) {
    const headers = worksheet.getRow(1).values;
    return headers.indexOf(columnName) + 1;
}

// Download image from URL
async function downloadImage(imageUrl, fileName) {
    try {
        // Specify the directory where images will be saved
        const downloadDir = 'C:/Users/hamzaa/Desktop/altinKitap';
        // Create the download directory if it doesn't exist
        fs.mkdirSync(downloadDir, { recursive: true });

        const filePath = path.join(downloadDir, fileName);
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream'
        });
        response.data.pipe(fs.createWriteStream(filePath));

        console.log(`Downloaded: ${fileName}`);
    } catch (error) {
        console.error(`Error downloading image from ${imageUrl}:`, error);
    }
}

// Call the function to read the Excel file
readExcel();
