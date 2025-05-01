import sharp from 'sharp';
import path from 'path';

async function generateFavicons() {
  const sizes = [16, 32, 180];
  const inputPath = path.join(process.cwd(), 'public', 'images', 'ensa_logo.png');

  for (const size of sizes) {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({ quality: 100 })
      .toFile(path.join(process.cwd(), 'public', 'images', `favicon-${size}x${size}.png`));
  }
}

generateFavicons().catch(console.error);