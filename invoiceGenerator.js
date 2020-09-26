const fs = require("fs");
const PDFDocument = require("pdfkit");

const invoice = {
    number: "12AB123",
    date: new Date(),
    customerName: "Test Customer",
    billingAddress: "AbC Street very big and nice street",
    shippingAddress: "AbC Street very big and nice street",
    customergstin: "GSTIN12345"
}
function createInvoice(path) {
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(path));
    generateHeader(doc);
    generateCustomerDetails(doc);
   
    doc.end();
}
function generateSeparator(doc){
    doc 
    .moveDown()
    .moveTo(45, doc.y)
    .lineTo(555, doc.y)
    .stroke();
        
}
function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, { width: 50 })
        .fontSize(20)
        .text("The College Bee", 110, 57)
        .fontSize(10)
        .text("Address Line 1")
        .text("Address Line 2")
        .text("GSTIN No. : HARDCODEDGST")
        .fontSize(10)
        .text("Computer Generated Invoice", 200, 65, { align: "right" })
        .fontSize(15)
        .text(`Invoice:${invoice.number}`, 200, 80, { align: "right" })
        .fontSize(10)
        .text(`Date : ${invoice.date.toDateString()}`, 200, 100, { align: "right" });
    generateSeparator(doc);
        
        
}
function generateCustomerDetails(doc) {
    let columnWidth=175;
    doc
    .moveDown(2)
    .font('Helvetica-Bold')
    .text("Customer Name:", 50, 130, { align: "left" ,width:columnWidth-10})
    .text("Billing Address:", 50+columnWidth, 130, { align: "left" ,width:columnWidth-10})
    .text("Shipping Address:", 50+columnWidth*2 , 130, { align: "left" ,width:columnWidth-10})
    .font('Helvetica')
    .text(invoice.customerName, 50, 145, { align: "left" ,width:columnWidth-10})
    .text(invoice.billingAddress, 50+columnWidth, 145, { align: "left" ,width:columnWidth-10})
    .text(invoice.shippingAddress, 50+columnWidth*2 , 145, { align: "left" ,width:columnWidth-10})
    
    .moveDown()
    .font('Helvetica-Bold')
    .text(`GSTIN No. :`,50,170)
    .font('Helvetica')
    .text(invoice.customergstin,50,185);
    generateSeparator(doc);

}
createInvoice('invoices/test.pdf');