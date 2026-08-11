/**
 * Datenresidenz — EINZIGE Quelle.
 *
 * Hintergrund: Auf der alten Seite stand „ausschliesslich in der Schweiz" an
 * mehreren Stellen, waehrend die Datenschutzerklaerung Sub-Auftragsverarbeiter
 * in den USA auflistete. Der Hotfix vom 10.08.2026 hat die Aussagen
 * angeglichen; hier stehen sie einmal, damit sie nicht erneut auseinanderlaufen.
 *
 * Der Text ist vom Betreiber entschieden und wortgleich zu uebernehmen. Er ist
 * bewusst laenger als ein Badge: Die kurze Fassung „nur Schweiz" war nicht
 * knapper, sondern falsch.
 *
 * Aenderungen hier muessen mit datenschutz.astro abgeglichen werden — die
 * Erklaerung ist der verbindliche Text, diese Seite fasst ihn zusammen.
 */

export const DATENRESIDENZ = {
  /** Kurzform fuer Hero und Karten. Nennt den belegbaren Kern: die Datenbank. */
  badge: 'Schweizer Datenbank (Zürich)',

  /** Die entschiedene Langfassung. Ersetzt „ausschliesslich in der Schweiz". */
  text:
    'Ihre Kundendaten, Anrufprotokolle und Transkripte werden in einem Schweizer ' +
    'Rechenzentrum in Zürich gespeichert. Für die Telefonie und die KI-Sprachverarbeitung ' +
    'arbeiten wir mit spezialisierten Anbietern zusammen, die diese Daten auch ausserhalb ' +
    'der Schweiz verarbeiten — ausschliesslich zur Durchführung des Gesprächs. Welche ' +
    'Anbieter das sind und wo sie sitzen, steht offen in unserer Datenschutzerklärung.',
} as const;
