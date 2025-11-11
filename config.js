export const config = {
  // Maksymalna szerokość obrazu po skalowaniu (px)
  maxWidth: 1000,
  
  // Operacje do wykonania na obrazie (w kolejności)
  // Dostępne: 'sharpen', 'normalize', 'modulate', 'gamma', 'median', 'blur', 'greyscale'
  // Rekomendowane dla ładnych zdjęć: ['normalize', 'sharpen', 'modulate']
  filters: ['normalize', 'sharpen', 'modulate'],
  
  // Parametry modulacji (tylko gdy 'modulate' jest w filters)
  // brightness: 1.0 = bez zmian, >1.0 = jaśniejsze, <1.0 = ciemniejsze
  // saturation: 1.0 = bez zmian, >1.0 = bardziej nasycone, <1.0 = mniej nasycone
  // hue: 0 = bez zmian, 0-360 = przesunięcie odcienia
  modulate: {
    brightness: 1.05,  // Lekkie rozjaśnienie
    saturation: 1.1,   // Lekki boost nasycenia
    hue: 0             // Bez zmiany odcienia
  },
  
  // Parametr gamma (tylko gdy 'gamma' jest w filters)
  // 1.0 = bez zmian, >1.0 = jaśniejsze, <1.0 = ciemniejsze
  gamma: 1.1,
  
  // Algorytm interpolacji przy skalowaniu
  // 'lanczos3' (domyślny, najlepsza jakość), 'lanczos2', 'cubic', 'linear', 'nearest'
  resizeKernel: 'lanczos3',
  
  // Jakość WebP (1-100)
  webpQuality: 80,
  
  // Ścieżki katalogów
  inputDir: './src',
  outputDir: './output'
};

