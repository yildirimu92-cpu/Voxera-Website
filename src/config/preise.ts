/**
 * Preise — EINZIGE Quelle.
 *
 * Hintergrund (Content-Audit C1): Auf der alten Seite standen die Preise
 * hartkodiert an mehreren Stellen, und `plan_config` in Supabase hat 0 Zeilen.
 * Genau dieses Muster hat dazu gefuehrt, dass ein Aktionspreis mit Ablaufdatum
 * „31. Mai 2026" ueber zwei Monate lang als aktuell angezeigt wurde.
 *
 * Deshalb: Preistabelle, Vergleich und die strukturierten Daten (Offer) ziehen
 * ihre Werte ausschliesslich von hier.
 *
 * STATUS: Platzhalter. Die Werte entsprechen dem Stand der alten Seite und sind
 * vom Betreiber freigegeben, um weiterbauen zu koennen. Die endgueltigen Preise
 * kommen nach der laufenden Margen-Rechnung (ElevenLabs-Ueberschreitungspreis,
 * Twilio-Minutenpreis stehen aus). `/preise/` geht erst mit den echten Zahlen live.
 */

export type Plan = {
  id: 'starter' | 'business' | 'professional';
  name: string;
  monatlichChf: number;
  einrichtungChf: number;
  inklusivMinuten: number;
  zusatzminuteChf: number;
  hervorgehoben?: boolean;
  /**
   * EIN Satz: fuer wen dieser Plan gemacht ist.
   *
   * Ersetzt die Haekchen-Tabelle. Eine Merkmalsmatrix beantwortet die Frage
   * „was ist alles drin" — gefragt wird aber „welcher passt zu mir". Zudem
   * verleitet eine Matrix dazu, Zeilen zu fuellen, und genau so sind auf der
   * alten Seite Merkmale in Plaene geraten, die es nicht gibt (C7).
   */
  fuerWen: string;
};

/**
 * ENTFERNT: `enthalten` und `nichtEnthalten`.
 *
 * Beide wurden nach dem Wegfall der Merkmalsmatrix nirgends mehr ausgeliefert.
 * Eine Konfiguration, die das Produkt beschreibt und auf keiner Seite erscheint,
 * driftet unbemerkt ab — dieselbe Bauform, aus der die ungedeckten Merkmale auf
 * der alten Seite entstanden sind.
 *
 * Die einzige harte Unterscheidung darin war „Rueckruf-Management" (nicht in
 * Starter). Sie steht jetzt im `fuerWen`-Satz des Business-Plans. Soll sie
 * ausdruecklich als Grenze des Starter-Plans erscheinen, gehoert sie dorthin
 * formuliert — nicht in eine wiederauferstehende Tabelle.
 */

export const PLAENE: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monatlichChf: 99,
    einrichtungChf: 490,
    inklusivMinuten: 20,
    zusatzminuteChf: 0.75,
    fuerWen:
      'Für Einzelbetriebe, bei denen das Telefon eher selten klingelt, ' +
      'ein verpasster Anruf aber trotzdem ein verlorener Auftrag ist.',
  },
  {
    id: 'business',
    name: 'Business',
    monatlichChf: 199,
    einrichtungChf: 690,
    inklusivMinuten: 100,
    zusatzminuteChf: 0.7,
    hervorgehoben: true,
    fuerWen:
      'Für Betriebe mit laufendem Kundenkontakt, die während der Arbeit ' +
      'nicht abnehmen können und Rückrufe geordnet abarbeiten wollen.',
  },
  {
    id: 'professional',
    name: 'Professional',
    monatlichChf: 299,
    einrichtungChf: 990,
    inklusivMinuten: 200,
    zusatzminuteChf: 0.65,
    fuerWen:
      'Für Betriebe mit hohem Anrufaufkommen, die den Assistenten auf ihre ' +
      'eigenen Abläufe zuschneiden lassen wollen.',
  },
];

/**
 * Aktion: derzeit KEINE.
 *
 * Bewusst leer, nicht auf ein altes Datum gesetzt. Ein Ablaufdatum, das ohne
 * Deploy still verstreicht, ist genau der Fehler aus C1 — lieber eine Luecke
 * als eine falsche Zusage.
 *
 * Wird wieder eine Aktion gefuehrt, hier eintragen:
 *   { gueltigBis: '2026-12-31', einrichtungChf: { starter: 390, ... } }
 * Der Build-Waechter (scripts/verify-seo.mjs) bricht ab, sobald `gueltigBis`
 * in der Vergangenheit liegt.
 */
export const AKTION: {
  gueltigBis: string;
  einrichtungChf: Record<Plan['id'], number>;
} | null = null;

/**
 * Vergleich gegen nutzungsbasierte Anbieter.
 *
 * Das Argument fuer den Festpreis: Bei nutzungsbasierter Abrechnung steigt die
 * Rechnung genau dann, wenn das Geschaeft laeuft — planbar ist das nicht.
 *
 * ACHTUNG, und das ist kein Formalismus: Eine quantitative Vergleichsangabe
 * ohne offengelegte Grundlage ist nach UWG angreifbar. Genau deshalb sind die
 * vier Vergleichszahlen (62 % / 3.4 h / CHF 4'500 / 72 %) von der Startseite
 * gestrichen worden — nicht vertagt, gestrichen, weil fuer keine eine Quelle
 * dokumentiert war.
 *
 * `monatlichChf` ist vom Betreiber entschieden. Die drei Annahmen darunter
 * fehlen noch. Solange sie fehlen, zeigt /preise/ die Zahl NICHT, sondern einen
 * Platzhalter: Ein Betrag ohne Rechenweg waere dieselbe Angreifbarkeit an
 * neuer Stelle.
 *
 * Zum Ausfuellen genuegen drei Werte; der Rechenweg steht dann auf der Seite
 * und ist nachrechenbar:
 *   anrufeProWoche * minutenProAnruf * chfProMinute * (52 / 12)
 */
export const VERGLEICH: {
  monatlichChf: number;
  anrufeProWoche: number;
  minutenProAnruf: number | null;
  chfProMinute: number | null;
  quelle: string | null;
} = {
  monatlichChf: 245,
  anrufeProWoche: 50,
  minutenProAnruf: null,
  chfProMinute: null,
  quelle: null,
};

/** Ist der Vergleich belegt genug, um ihn zu zeigen? */
export const VERGLEICH_BELEGT =
  VERGLEICH.minutenProAnruf !== null &&
  VERGLEICH.chfProMinute !== null &&
  VERGLEICH.quelle !== null;

export const KONDITIONEN = [
  'Alle Preise in CHF, exkl. MwSt.',
  'Keine Mindestlaufzeit bei Monatsplänen, 30 Tage Kündigungsfrist',
  'Jahrespläne: 12 Monate Laufzeit, 10 % Rabatt, automatische Verlängerung ohne Kündigung 30 Tage vor Ablauf',
];

/** Merkmale, die noch nicht existieren, gehoeren nicht in die Feature-Liste
 *  eines bezahlten Plans (Content-Audit C7). Sie stehen hier getrennt und
 *  werden ohne Preisbezug ausgewiesen. */
export const GEPLANT: { plan: Plan['id']; was: string }[] = [
  { plan: 'professional', was: 'Erweiterte Auswertungen' },
];
