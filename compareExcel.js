const XLSX = require('xlsx');
const fs = require('fs');

// Excel dosyalarının yollarını belirtin
const file1 = 'C:/Users/hamzaa/Desktop/stokListesiYeni.xlsx';
const file2 = 'C:/Users/hamzaa/Desktop/imajOlanlar.xls';
const outputFile = 'C:/Users/hamzaa/Desktop/eslesenKayitlar.xlsx';

// Excel dosyalarını oku
const workbook1 = XLSX.readFile(file1);
const workbook2 = XLSX.readFile(file2);

// İlk sayfayı seç
const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

// Verileri JSON formatında al
const data1 = XLSX.utils.sheet_to_json(sheet1);
const data2 = XLSX.utils.sheet_to_json(sheet2);

// Eşleşen verileri tutmak için bir array oluştur
const matchedRows = [];

// İkinci dosyadaki sütunları bir Set içinde sakla
const column2Values = new Set(data2.map(row => row['Stok Kod'])); // Burada 'SütunAdı' karşılaştırmak istediğiniz sütun başlığı

// İlk dosyadaki verileri kontrol et ve eşleşenleri topla
data1.forEach(row => {
  if (column2Values.has(row['Stok Kod'])) { // Yine 'SütunAdı' karşılaştırmak istediğiniz sütun başlığı
    matchedRows.push(row);
  }
});

console.log(matchedRows)
// Eşleşen satırları yeni bir Excel dosyasına yaz
const newSheet = XLSX.utils.json_to_sheet(matchedRows);
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Eşleşen Veriler');

// Yeni dosyayı kaydet
XLSX.writeFile(newWorkbook, outputFile);

console.log('Eşleşen veriler yeni dosyaya kaydedildi: ' + outputFile);
