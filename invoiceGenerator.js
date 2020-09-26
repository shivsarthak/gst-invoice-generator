const fs = require("fs");
const PDFDocument = require("pdfkit");

const invoice = {
    number: "12ABC123",
    date: new Date(),
    customerName: "Test Customer",
    customerAddress:"AbC Street very big and nice street",
    customergstin:"TestGSTIN123"
}
function createInvoice(path) {
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(path));
    generateHeader(doc);
    doc
        .moveDown(2)
        .font('Helvetica-Bold')
        .fontSize(10)
        .text("Customer Name:", 50)
        .font('Helvetica')
        .fontSize(12)
        .text(invoice.customerName)
        .fontSize(10)
        .text(invoice.customerAddress)
        .text(`GSTIN : ${invoice.customergstin}`);
    doc.end();
}
function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, { width: 50 })
        .fontSize(20)
        .text("The College Bee", 110, 57)
        .fontSize(10)
        .text("Address Line 1")
        .text("Address Line 2")
        .text("GSTIN No: HARDCODEDGST")
        .fontSize(10)
        .text("Computer Generated Invoice", 200, 65, { align: "right" })
        .fontSize(15)
        .text(`Invoice:${invoice.number}`, 200, 80, { align: "right" })
        .fontSize(10)
        .text(`Date : ${invoice.date.toDateString()}`, 200, 100, { align: "right" })
        .moveTo(50, 120)
        .lineTo(550, 120)
        .stroke();
}
function generateBillingDetails(doc) {


}
createInvoice('invoices/test.pdf');