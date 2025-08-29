import express from 'express';
import dotenv from "dotenv"
import {upload} from "./Middleware/multer.middleware.js";
dotenv.config();
const app = express();  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { parseReceiptText } from './utils/pars.js';
import { extractText } from './utils/Aws.js';
import fs from "fs/promises";
app.get("/", (req, res) => {
   return res.json({ message: "Upload endpoint" });
});
//endpoint for file upload and conversion into text and then json
app.use("/api/upload", upload.single("file"), async (req, res) => {

    try {
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;

        const text = await extractText(filePath, mimeType);
        const parsetext = await parseReceiptText(text);
        // Delete file after processing
        await fs.unlink(filePath);
    return  res.json({ success: true, parsedData: parsetext });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "OCR failed" });
    }
    
   
});
app.listen(process.env.PORT||3000, () => {
    console.log(`Server is running on port ${process.env.PORT||3000}`);
});
