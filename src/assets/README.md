# Bilder, die durch die Astro-Pipeline laufen

Alles hier wird beim Build verarbeitet: Grösse angepasst, in moderne Formate
umgewandelt (WebP/AVIF), mit Hash im Dateinamen versehen und mit `width`/`height`
im HTML ausgeliefert.

**Nicht zu verwechseln mit `public/`.** Was dort liegt, wird unverändert
ausgeliefert — richtig für Favicons und `og-image.png`, die exakt so bleiben
müssen, wie sie sind. Für Inhaltsbilder ist `public/` die schlechtere Wahl:
keine Optimierung, keine Massangaben im HTML, und damit Layoutsprünge beim Laden.

## Erwartete Datei

| | |
|---|---|
| **Pfad** | `src/assets/umut-yildirim.jpg` |
| **Format** | JPEG oder PNG — unkomprimiert ist in Ordnung, die Pipeline übernimmt das |
| **Ausrichtung** | Hochformat oder quadratisch |
| **Grösse** | kurze Kante mindestens 880 px |
| **Seitenverhältnis** | beliebig — der quadratische Zuschnitt passiert beim Build |

**Geliefert am 12.08.2026:** 882 × 953 px, JPEG, 152 KB. Die kurze Kante (882)
bestimmt die Anzeigebreite: 440 CSS-Pixel, weil ein Bildschirm mit doppelter
Pixeldichte dafür 880 Quellpixel braucht.

Kein WebP und kein AVIF anliefern — die erzeugt der Build selbst, und aus einem
bereits komprimierten Bild wird dabei ein schlechteres.

Grösser als nötig ist unproblematisch: Die Pipeline rechnet herunter, aber nie
hinauf. Ein zu kleines Bild bleibt auf grossen Bildschirmen unscharf.

## Danach

`src/pages/ueber-uns/index.astro` einbinden — der Platzhalter dort verschwindet
mit derselben Änderung:

```astro
import { Image } from 'astro:assets';
import portrait from '../../assets/umut-yildirim.jpg';

<Image
  src={portrait}
  alt="Umut Yildirim, Gründer von Voxera"
  width={440} height={440}
  fit="cover" position="top"
  loading="lazy"
/>
```

`alt` beschreibt die Person, nicht das Bild — Bildschirmleser sagen „Grafik"
bereits selbst an.

`fit="cover"` schneidet beim Build auf 1:1 zu, nicht im Browser — sonst lädt
jeder Besucher Bildbereiche herunter, die er nicht zu sehen bekommt.

`position="top"` statt der Mitte: Bei einem Hochformat fällt der Überschuss
sonst zur Hälfte oben ab und schneidet ins Haar. Von oben ausgerichtet fällt
alles unten weg, wo nur Kleidung ist.

Die Pipeline entfernt dabei auch die EXIF-Daten — im Ausgabebild ist keine
Kamera- oder Ortsangabe mehr enthalten.
