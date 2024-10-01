const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const upload = multer({ dest: os.tmpdir() }); // Use temporary directory

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle file uploads
app.post('/upload', upload.fields([{ name: 'table1' }, { name: 'table2' }]), (req, res) => {
    const file1Path = req.files['table1'][0].path;
    const file2Path = req.files['table2'][0].path;

    const table1 = readExcelFile(file1Path);
    const table2 = readExcelFile(file2Path);
    const updatedTable2 = mergeTables(table1, table2);

    const newSheet = XLSX.utils.json_to_sheet(updatedTable2);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Updated Table 2');

    const outputFilePath = path.join(os.tmpdir(), 'updated_table2.xlsx'); // Use temp dir for output
    XLSX.writeFile(newWorkbook, outputFilePath);

    // Clean up uploaded files
    fs.unlinkSync(file1Path);
    fs.unlinkSync(file2Path);

    res.download(outputFilePath, 'updated_table2.xlsx', (err) => {
        if (err) {
            console.log(err);
        }
        fs.unlinkSync(outputFilePath); // Remove the file after download
    });
});

// Function to read an Excel file and convert it to JSON
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath, { cellDates: true });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

// Function to merge two tables
function mergeTables(table1, table2) {
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

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = '192.168.4.117'; // Bind to all available IP addresses
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
