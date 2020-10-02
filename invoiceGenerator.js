const fs = require("fs");
const PDFDocument = require("pdfkit");

const invoice = {
    number: "12AB123",
    date: new Date(),
    customerName: "Test Customer",
    billingAddress: "AbC Street very big and nice street",
    shippingAddress: "AbC Street very big and nice street",
    customergstin: "GSTIN12345",
    items: [
        {
            name: "Item 1",
            price: 932,
            HSN: 8402,
            quantity: 2
        },
        {
            name: "Item 2 ",
            price: 350,
            HSN: 8402,
            quantity: 2
        },
        {
            name: "Item 3",
            price: 350,
            HSN: 8402,
            quantity: 2
        }
    ]
}
function createInvoice(path) {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream(path));
    generateHeader(doc);
    generateCustomerDetails(doc);
    generateItemList(doc);

    doc.end();
}
function generateSeparator(doc) {
    doc
        .moveDown()
        .moveTo(40, doc.y)
        .lineTo(570, doc.y)
        .stroke();

}
function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, { width: 50 })
        .fontSize(20)
        .text("The College Bee", 110, 57)
        .fontSize(10)
        .text("Delhi NCR")
        .text("India")
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
    let columnWidth = 175;
    doc
        .moveDown(2)
        .font('Helvetica-Bold')
        .text("Customer Name:", 50, 130, { align: "left", width: columnWidth - 10 })
        .text("Billing Address:", 50 + columnWidth, 130, { align: "left", width: columnWidth - 10 })
        .text("Shipping Address:", 50 + columnWidth * 2, 130, { align: "left", width: columnWidth - 10 })
        .font('Helvetica')
        .text(invoice.customerName, 50, 145, { align: "left", width: columnWidth - 10 })
        .text(invoice.billingAddress, 50 + columnWidth, 145, { align: "left", width: columnWidth - 10 })
        .text(invoice.shippingAddress, 50 + columnWidth * 2, 145, { align: "left", width: columnWidth - 10 })

        .moveDown()
        .font('Helvetica-Bold')
        .text(`GSTIN No. :`, 50, 170)
        .font('Helvetica')
        .text(invoice.customergstin, 50, 185);
    generateSeparator(doc);

}
function generateItemList(doc) {

    doc
        .moveDown();
    let y = doc.y + 5;
    doc
        .font('Helvetica-Bold')
        .text("S.No.", 50, y, { align: "left", width: 30 })
        .text("Name", 90, y, { align: "left", width: 175 })
        .text("HSN", 270, y, { align: "left", width: 50 })
        .text("QTY", 310, y, { align: "left", width: 40 })
        .text("Price", 350, y, { align: "left", width: 60 })
        .text("CGST", 390, y, { align: "left", width: 60 })
        .text("SGST", 450, y, { align: "left", width: 175 })
        .text("Amount", 0, y, { align: "right" })
        ;
    generateSeparator(doc);
    let index = 1;
    let total = 0;

    invoice.items.forEach(item => {
        let price =(item.price * item.quantity)*1.18;
        total += price;
        y = (index == 1) ? doc.y + 10 : doc.y + 50;
        doc
            .font('Helvetica')
            .text(`${index}.`, 50, y, { align: "left", width: 30 })
            .text(item.name, 90, y, { align: "left", width: 175 })
            .text(item.HSN, 270, y, { align: "left", width: 50 })
            .text(item.quantity, 310, y, { align: "left", width: 80 })
            .text(item.price, 350, y, { align: "left", width: 60 })
            .text(`@9%\n${(item.price * 0.9).toFixed(2)}*${item.quantity}`, 390, y, { align: "left", width: 60 })
            .text(`@9%\n${(item.price * 0.9).toFixed(2)}*${item.quantity}`, 450, y, { align: "left", width: 175 })
            .text(price, 0, y, { align: "right" })
            ;
        index += 1;
    });
    generateSeparator(doc);
    y = doc.y + 15;
    doc
        .font('Helvetica-Bold')
        .text("Total ", 50, y, { align: "left" })
        .text(total, 50, y, { align: "right" })
    generateSeparator(doc);


}
createInvoice('invoices/test.pdf')