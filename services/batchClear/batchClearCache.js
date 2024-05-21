const fs = require('fs');
const path = require('path');
const axios = require("axios");
const readline = require("readline");

// Directory where the text files are located
const directoryPath = 'C:/Users/CREINOSO/Documents/projects/akamai/services/batchClear';

// Function to send batch of URLs to Akamai
const sendBatchAkamaiUrls = async (batch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/akamai', {
      "objects": JSON.stringify(batch)
    });
  } catch (error) {
    console.log("🚀 ~ akamai ~ error:", error);
  }
};

// Function to process a single file
const processFile = async (filePath) => {
  const objectsStream = fs.createReadStream(filePath); // Create a readable stream for the text file
  const objectsReader = readline.createInterface({
    input: objectsStream,
    crlfDelay: Infinity
  });

  let batch = [];
  let totalCount = 0;

  for await (const line of objectsReader) {
    // Assuming each line in the file contains a URL
    batch.push(line.trim());
    totalCount++;

    if (batch.length >= 1750) { 
      await sendBatchAkamaiUrls(batch);
      console.log("Batch sent with item:", totalCount);
      // Reset batch
      batch = [];
    }
  }

  // Send the remaining items if any
  if (batch.length > 0) {
    await sendBatchAkamaiUrls(batch);
  }

  console.log(`Total items processed in file ${filePath}: ${totalCount}`);
};

// Read all text files in the directory and process each one
fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter out only text files
  const textFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

  // If there are no text files in the directory
  if (textFiles.length === 0) {
    console.log('No text files found in the directory.');
    return;
  }

  // Process each text file
  for (const textFile of textFiles) {
    const filePath = path.join(directoryPath, textFile);
    await processFile(filePath);
  }
});
