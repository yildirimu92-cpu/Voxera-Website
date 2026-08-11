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
| **Ausrichtung** | Hochformat |
| **Grösse** | mindestens 800 px auf der kurzen Kante, gerne mehr |
| **Seitenverhältnis** | 3:4 oder 4:5 |

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

<Image src={portrait} alt="Umut Yildirim, Gründer von Voxera" width={480} loading="lazy" />
```

`alt` beschreibt die Person, nicht das Bild — Bildschirmleser sagen „Grafik"
bereits selbst an.
