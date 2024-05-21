const fs = require('fs');
const path = require('path');
const axios = require("axios");
const readline = require("readline");

// Directory where the text file is located
const directoryPath = 'C:/Users/CREINOSO/Documents/projects/akamai/services/batchClear';

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
  
    // Assuming we want to read the first text file found in the directory
    const firstTextFile = path.join(directoryPath, textFiles[0]);

    const objectsStream = fs.createReadStream(firstTextFile); // Create a readable stream for the text file
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

        if (batch.length >= 1500) { 
            await sendBatchAkamaiUrls(batch);
            console.log("batch was sent with item:", totalCount)
            //reset batch 
            batch = [];
        }
    }

    // Send the remaining items if any
    if (batch.length > 0) {
      await sendBatchAkamaiUrls(batch);
    }

    console.log(`Total items processed: ${totalCount}`);
  })

  const sendBatchAkamaiUrls = async (batch) => {
    console.log("🚀 ~ sendBatchAkamaiUrls ~ batch:", batch)

        try {
          const response = await axios.post(
            'http://localhost:3000/api/akamai',
            {
              "objects": JSON.stringify(batch)
            }
          );
        } catch (error) {
          console.log("🚀 ~ akamai ~ error:", error);
        }
  }
    