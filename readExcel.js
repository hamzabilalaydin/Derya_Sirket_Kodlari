const XLSX = require('xlsx');
const fs = require('fs');

// Path to your Excel file
const filePath = 'C:/Users/hamzaa/Desktop/b2b_imaj_rapor_olmayanlar_1714034897.xls';

// Read the Excel file
const workbook = XLSX.readFile(filePath);

// Get the first sheet
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// Convert the worksheet to a JSON object
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Output the JSON data
jsonData.forEach(data => {
    if (data.Barkod == undefined) {
        console.log("Barkod bulunamadi")
    } else {
        console.log(data.Barkod)
    }

})
