# Image Optimization Tool

Narzędzie do optymalizacji obrazów JPG → WebP z możliwością skalowania i zastosowania filtrów.

## Instalacja

```bash
npm install
```

## Konfiguracja

Edytuj plik `config.js` aby dostosować parametry:

- `maxWidth` - maksymalna szerokość obrazu po skalowaniu (px)
- `filters` - tablica operacji do wykonania w kolejności:
  - `'normalize'` - normalizacja histogramu (poprawa kontrastu)
  - `'sharpen'` - wyostrzenie (przydatne po skalowaniu)
  - `'modulate'` - modulacja jasności/nasycenia/odcienia
  - `'gamma'` - korekta gamma
  - `'median'` - redukcja szumu
  - `'blur'` - rozmycie
  - `'greyscale'` - konwersja do skali szarości
- `modulate` - parametry modulacji (brightness, saturation, hue)
- `gamma` - wartość korekty gamma
- `resizeKernel` - algorytm interpolacji: `'lanczos3'` (domyślny, najlepszy), `'lanczos2'`, `'cubic'`, `'linear'`, `'nearest'`
- `webpQuality` - jakość WebP (1-100)

**Rekomendowana konfiguracja dla ładnych zdjęć:**
```js
filters: ['normalize', 'sharpen', 'modulate']
```

## Użycie

1. Umieść pliki JPG w katalogu `src/`
2. Uruchom:
```bash
npm start
```
3. Przetworzone pliki WebP znajdziesz w katalogu `output/`

## Pipeline przetwarzania

1. **Skalowanie** - obraz jest skalowany do maksymalnej szerokości (zachowanie proporcji)
2. **Filtry** - zastosowanie konfigurowalnych operacji (np. sharpen)
3. **Konwersja** - konwersja do formatu WebP z określoną jakością

