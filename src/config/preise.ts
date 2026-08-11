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
  /**
   * Was dieser Plan NICHT kann — ausdruecklich, in einem Satz.
   *
   * Ohne die Merkmalsmatrix erfuehre ein Starter-Interessent sonst nie, was ihm
   * fehlt: Die Grenze stuende nur implizit im fuerWen-Satz des naechsten Plans,
   * und den liest, wer sich fuer den guenstigsten entschieden hat, nicht mehr.
   * Nur setzen, wo es eine harte funktionale Grenze gibt.
   */
  grenze?: string;
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
 * Starter). Sie steht jetzt als `grenze` auf der Starter-Karte — ausdruecklich
 * und dort, wo sie gelesen wird, statt implizit im Satz des naechsten Plans.
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
    grenze:
      'Ohne Rückruf-Management: Sie sehen jede Anfrage im Dashboard, aber Voxera ' +
      'führt keine Rückrufliste mit Status. Das gibt es ab Business.',
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
 * Vergleich gegen nutzungsbasierte Anbieter — DERZEIT NICHT AUF DER SEITE.
 *
 * Das Argument fuer den Festpreis steht auf /preise/ ohne Zahl: Bei
 * nutzungsbasierter Abrechnung steigt die Rechnung genau dann, wenn das
 * Geschaeft laeuft.
 *
 * Die Zahl (rund CHF 245 im Monat bei 50 Anrufen pro Woche) stammt aus einer
 * Beispielrechnung des Wettbewerbers selbst und ist damit zitierfaehig — sie
 * muss aber vor der Veroeffentlichung gegen dessen aktuelle Preisseite geprueft
 * werden. Bis dahin steht sie NICHT hier als Platzhalter, der auf etwas wartet,
 * sondern als eigener Punkt im Fahrplan. Ein Platzhalter haette die Seite
 * blockiert, obwohl der Abschnitt ohne die Zahl vollstaendig ist.
 *
 * Siehe Issue im Repo: "Vergleichszahl gegen nutzungsbasierte Anbieter".
 */

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
