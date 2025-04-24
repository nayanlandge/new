const PDFDocument = require('pdfkit');

const generateStudentReceipt = async (student) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.fontSize(20).text('Student Fee Receipt', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${student.name}`);
        doc.text(`Stream: ${student.stream}`);
        doc.text(`Academic Year: ${new Date(student.year).getFullYear()}`);
        doc.text(`Phone: ${student.phone}`);
        doc.text(`Total Fees: ₹${student.fees}`);
        doc.text(`Fees Paid: ${student.feesPaid ? 'Yes' : 'No'}`);
        const remaining = student.feesPaid ? 0 : student.fees;
        doc.text(`Pending Amount: ₹${remaining}`);

        doc.end();
    });
};

module.exports = generateStudentReceipt;
