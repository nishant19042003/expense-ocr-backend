import AWS from "aws-sdk";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
AWS.config.update({ region: process.env.AWS_REGION });
const textract = new AWS.Textract();
export async function extractText(filePath, mimeType) {
  const bytes = await fs.readFile(filePath);

  // For images (JPG/PNG)
  if (mimeType.startsWith("image/")) {
    const resp = await textract
      .detectDocumentText({ Document: { Bytes: bytes } })
      .promise();

    return resp.Blocks
      .filter(b => b.BlockType === "LINE")
      .map(b => b.Text)
      .join("\n");
  }

  // For PDFs (AnalyzeDocument is better)
  const resp = await textract
    .analyzeDocument({
      Document: { Bytes: bytes },
      FeatureTypes: ["FORMS"],
    })
    .promise();

  return (resp.Blocks || [])
    .filter(b => b.BlockType === "LINE")
    .map(b => b.Text)
    .join("\n");
}
