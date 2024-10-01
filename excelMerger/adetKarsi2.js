const XLSX = require('xlsx');
const fs = require('fs');

// Function to read an Excel file and convert it to JSON
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath, { cellDates: true });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}


// Function to merge two tables
function mergeTables(moreColumns, lessColumns) {
    const lookup = {};

    
    table1.forEach(row => {
        const key = `${row['Ürün sağlayıcı']}|${row['Belge No']}|${row['Ürün Kodu']}`;
        lookup[key] = row['Adet'];
    });

    table2.forEach(row => {
        const key = `${row['Ürün sağlayıcı']}|${row['Belge No']}|${row['Ürün Kodu']}`;
        row['Adet'] = lookup[key] !== undefined ? lookup[key] : null;
    });
    
    return table2;
}

// Load the Excel files
const table1 = readExcelFile("C:/Users/hamzaa/Desktop/kod/denemeAdet.xlsx");
const table2 = readExcelFile("C:/Users/hamzaa/Desktop/kod/denemeRapor.xlsx");

// Merge the tables
const updatedTable2 = mergeTables(table1, table2);

// Convert updatedTable2 back to a worksheet
const newSheet = XLSX.utils.json_to_sheet(updatedTable2);
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Updated Table 2');

// Write to a new Excel file
XLSX.writeFile(newWorkbook, 'updated_table2.xlsx');
console.log("Yeni Dosya Oluşturuldu")