import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname } from 'path';
import { config } from './config.js';
import { existsSync, mkdirSync } from 'fs';

async function processImage(inputPath, outputPath) {
  let pipeline = sharp(inputPath);
  
  // Krok 1: Skalowanie (zachowanie proporcji)
  const metadata = await pipeline.metadata();
  if (metadata.width > config.maxWidth) {
    pipeline = pipeline.resize(config.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside',
      kernel: config.resizeKernel || 'lanczos3'
    });
  }
  
  // Krok 2: Zastosowanie filtrów
  for (const filter of config.filters) {
    switch (filter) {
      case 'sharpen':
        pipeline = pipeline.sharpen();
        break;
      case 'normalize':
        pipeline = pipeline.normalize();
        break;
      case 'modulate':
        pipeline = pipeline.modulate({
          brightness: config.modulate?.brightness || 1.0,
          saturation: config.modulate?.saturation || 1.0,
          hue: config.modulate?.hue || 0
        });
        break;
      case 'gamma':
        pipeline = pipeline.gamma(config.gamma || 1.0);
        break;
      case 'median':
        pipeline = pipeline.median(3);
        break;
      case 'blur':
        pipeline = pipeline.blur(1);
        break;
      case 'greyscale':
        pipeline = pipeline.greyscale();
        break;
    }
  }
  
  // Krok 3: Konwersja do WebP i zapis
  await pipeline
    .webp({ quality: config.webpQuality })
    .toFile(outputPath);
  
  console.log(`✓ Przetworzono: ${inputPath} → ${outputPath}`);
}

async function main() {
  // Utworzenie katalogu output jeśli nie istnieje
  if (!existsSync(config.outputDir)) {
    mkdirSync(config.outputDir, { recursive: true });
  }
  
  // Wczytanie plików z katalogu src
  const files = await readdir(config.inputDir);
  const jpgFiles = files.filter(file => 
    ['.jpg', '.jpeg', '.JPG', '.JPEG'].includes(extname(file))
  );
  
  if (jpgFiles.length === 0) {
    console.log('Brak plików JPG w katalogu src/');
    return;
  }
  
  console.log(`Znaleziono ${jpgFiles.length} plików JPG do przetworzenia\n`);
  
  // Przetworzenie każdego pliku
  for (const file of jpgFiles) {
    const inputPath = join(config.inputDir, file);
    const outputName = file.replace(/\.(jpg|jpeg)$/i, '.webp');
    const outputPath = join(config.outputDir, outputName);
    
    try {
      await processImage(inputPath, outputPath);
    } catch (error) {
      console.error(`✗ Błąd przy przetwarzaniu ${file}:`, error.message);
    }
  }
  
  console.log(`\n✓ Zakończono przetwarzanie ${jpgFiles.length} plików`);
}

main().catch(console.error);

