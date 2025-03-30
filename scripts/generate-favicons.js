// This file converts the LeadCloser logo to a favicon
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 256];
const inputFile = path.join(__dirname, '../public/images/LeadCloserLogo.jpg');
const outputDir = path.join(__dirname, '../public/favicon');

async function generateFavicons() {
  try {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create favicon.ico (multi-size icon)
    const icoSizes = [16, 32, 48];
    const icoBuffers = await Promise.all(
      icoSizes.map(size => 
        sharp(inputFile)
          .resize(size, size)
          .toFormat('png')
          .toBuffer()
      )
    );

    // Write individual size favicons
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
      
      console.log(`Generated favicon-${size}x${size}.png`);
    }

    // Create apple-touch-icon
    await sharp(inputFile)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('Generated apple-touch-icon.png');

    // Create android-chrome icons
    await sharp(inputFile)
      .resize(192, 192)
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    
    await sharp(inputFile)
      .resize(512, 512)
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    
    console.log('Generated android-chrome icons');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
