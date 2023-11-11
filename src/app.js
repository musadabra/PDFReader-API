const express = require('express');
const PdfController = require('./controllers/pdfController');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Multer setup
const storage = multer.memoryStorage(); // Store files in memory (adjust as needed)
const upload = multer({ storage: storage });

// Middleware for handling multipart/form-data
app.use(upload.single('pdf'));
app.use(express.json({ limit: '50mb' })); // Adjust the limit based on your needs
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Adjust the limit based on your needs

app.use(express.json());

const pdfController = new PdfController();

app.post('/extract-text', pdfController.extractText);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
