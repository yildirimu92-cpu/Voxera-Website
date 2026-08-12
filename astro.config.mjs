import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statische Ausgabe: eine echte HTML-Datei pro URL. Kein Hash-Routing, kein
// Client-Side-Only-Rendering — jede Unterseite muss ohne JavaScript vollstaendig
// lesbar sein (Zielbild B.5).
export default defineConfig({
  site: 'https://voxera.ch',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Was auf noindex steht, gehoert nicht in die Sitemap — sonst laedt man
      // Google auf eine Seite ein, die man ihm gleichzeitig verbietet.
      //
      // Zwei Gruppen:
      //  1. Transaktionsseiten (kein Marketing).
      //  2. Bestaetigungsseiten, die nur nach einem Formularversand erscheinen.
      //
      // Gesperrte Branchen brauchen hier KEINE Regel mehr: sie werden gar
      // nicht erst erzeugt (BRANCHEN_SICHTBAR in src/config/site.ts). Eine
      // Seite, die es nicht gibt, kann auch nicht in der Sitemap landen --
      // das ist die verlaesslichere Sperre als ein Filtereintrag, den man
      // beim naechsten gesperrten Slug vergisst.
      //
      // Diese Liste wird von scripts/verify-seo.mjs gegen die tatsaechlich
      // ausgelieferten noindex-Seiten geprueft: laeuft sie auseinander,
      // bricht der Build ab.
      filter: (page) =>
        !page.includes('/offer-accept') &&
        !page.includes('/contract-signed') &&
        !page.includes('/kontakt/danke/'),
    }),
  ],
  // Kein Framework-Runtime im Auslieferungsstand. JS-Budget: 30 KB gzipped
  // ueber die ganze Seite — siehe scripts/verify-seo.mjs.
});
