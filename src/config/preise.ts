/**
 * Preise — EINZIGE Quelle.
 *
 * Hintergrund (Content-Audit C1): Auf der alten Seite standen die Preise
 * hartkodiert an mehreren Stellen, und `plan_config` in Supabase hat 0 Zeilen.
 * Genau dieses Muster hat dazu gefuehrt, dass ein Aktionspreis mit Ablaufdatum
 * „31. Mai 2026" ueber zwei Monate lang als aktuell angezeigt wurde.
 *
 * Deshalb: Preistabelle, Umschalter und die strukturierten Daten (Offer) ziehen
 * ihre Werte ausschliesslich von hier.
 *
 * STAND 12.08.2026: final. Grundlage ist die Preisstruktur des Betreibers vom
 * selben Tag. Der Platzhalter fuer C1 ist damit aufgeloest.
 *
 * NICHT UEBERNOMMEN aus jener Struktur: variable Kosten pro Minute, Fixkosten,
 * Deckungsbeitraege, Lieferantenpreise und die Pilotkonditionen. Das sind
 * interne Zahlen; auf einer oeffentlichen Seite waeren sie Angaben, die
 * Aussenstehende weder einordnen noch pruefen koennen.
 */

/* ------------------------------------------------------------------ *
 * Laufzeiten
 * ------------------------------------------------------------------ */

/**
 * Vier Stufen, nicht zwei.
 *
 * Die SaaS-Konvention „monatlich/jaehrlich" bildet zwei Stufen ab; hier gibt es
 * vier. Ein Zweifach-Umschalter haette 2 und 3 Jahre verschwinden lassen — und
 * damit den staerksten Bindungsanreiz: Starter kostet bei drei Jahren CHF 110
 * statt CHF 148.
 *
 * Die Preise stehen ausgeschrieben statt als Faktor mal Referenzpreis. Ein
 * gerundeter Rechenweg im Code ist eine zweite Wahrheit neben der Preisliste;
 * ausgeschriebene Werte sind gegen die Struktur pruefbar. Die Faktoren stehen
 * als Beleg daneben, nicht als Rechengrundlage.
 */
export type LaufzeitId = 'monatlich' | 'jahr1' | 'jahr2' | 'jahr3';

export const LAUFZEITEN: {
  id: LaufzeitId;
  label: string;
  kurz: string;
  faktor: string;
  referenz?: boolean;
  zahlung: string;
}[] = [
  {
    id: 'monatlich',
    label: 'Monatlich kündbar',
    kurz: 'monatlich',
    faktor: '+15 %',
    zahlung: 'Monatliche Zahlung.',
  },
  {
    id: 'jahr1',
    label: '1 Jahr',
    kurz: '1 Jahr',
    faktor: 'Referenzpreis',
    referenz: true,
    zahlung: 'Jährliche Vorauszahlung.',
  },
  {
    id: 'jahr2',
    label: '2 Jahre',
    kurz: '2 Jahre',
    faktor: '−10 %',
    zahlung: 'Jedes Vertragsjahr einzeln im Voraus — nicht die ganze Laufzeit auf einmal.',
  },
  {
    id: 'jahr3',
    label: '3 Jahre',
    kurz: '3 Jahre',
    faktor: '−15 %',
    zahlung: 'Jedes Vertragsjahr einzeln im Voraus — nicht die ganze Laufzeit auf einmal.',
  },
];

export const LAUFZEIT_STANDARD: LaufzeitId = 'jahr1';

/* ------------------------------------------------------------------ *
 * Plaene
 * ------------------------------------------------------------------ */

export type Plan = {
  id: 'starter' | 'business' | 'professional' | 'enterprise';
  name: string;
  /** Monatspreis je Laufzeit. Fehlt bei „Preis auf Anfrage". */
  preise?: Record<LaufzeitId, number>;
  einrichtungChf?: number;
  anrufeProMonat?: string;
  inklusivMinuten?: number;
  gleichzeitigeAnrufe: string;
  zusatzminuteChf?: number;
  hervorgehoben?: boolean;
  aufAnfrage?: boolean;
  /**
   * EIN Satz: fuer wen dieser Plan gemacht ist.
   *
   * Ersetzt die Haekchen-Tabelle. Eine Merkmalsmatrix beantwortet „was ist alles
   * drin" — gefragt wird „welcher passt zu mir". Zudem verleitet eine Matrix
   * dazu, Zeilen zu fuellen, und genau so sind auf der alten Seite Merkmale in
   * Plaene geraten, die es nicht gibt (C7).
   *
   * Diese Saetze nennen ausschliesslich Faehigkeiten, die heute real sind. Der
   * Verkaufssatz der Preisstruktur zum Business-Plan („Sie wissen sofort, ob es
   * dringend ist") ist bewusst NICHT uebernommen: Er beschreibt den
   * SMS-Dringlichkeitsalarm, und der steht unter GEPLANT.
   */
  fuerWen: string;
  /** Was dieser Plan nicht kann — ausdruecklich, wo es eine harte Grenze gibt. */
  grenze?: string;
};

export const PLAENE: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    preise: { monatlich: 148, jahr1: 129, jahr2: 116, jahr3: 110 },
    einrichtungChf: 490,
    anrufeProMonat: 'rund 90',
    inklusivMinuten: 225,
    gleichzeitigeAnrufe: '6',
    zusatzminuteChf: 0.45,
    fuerWen:
      'Für Einzelbetriebe mit zwei bis vier Anrufen am Tag, bei denen ein ' +
      'verpasster Anruf trotzdem ein verlorener Auftrag ist.',
    grenze:
      'Ohne Rückruf-Management: Sie sehen jede Anfrage im Dashboard, aber Voxera ' +
      'führt keine Rückrufliste mit Status. Das gibt es ab Business.',
  },
  {
    id: 'business',
    name: 'Business',
    preise: { monatlich: 286, jahr1: 249, jahr2: 224, jahr3: 212 },
    einrichtungChf: 690,
    anrufeProMonat: 'rund 300',
    inklusivMinuten: 750,
    gleichzeitigeAnrufe: '20',
    zusatzminuteChf: 0.38,
    hervorgehoben: true,
    fuerWen:
      'Für Betriebe mit acht bis zwölf Anrufen am Tag, die Rückrufe geordnet ' +
      'abarbeiten wollen statt sie aus Notizen zusammenzusuchen.',
  },
  {
    id: 'professional',
    name: 'Professional',
    preise: { monatlich: 574, jahr1: 499, jahr2: 449, jahr3: 424 },
    einrichtungChf: 990,
    anrufeProMonat: 'rund 750',
    inklusivMinuten: 1875,
    gleichzeitigeAnrufe: '30',
    zusatzminuteChf: 0.32,
    fuerWen:
      'Für Betriebe mit rund 25 Anrufen am Tag, die eigene Begrüssung und ' +
      'Stimme festlegen und priorisierten Support wollen.',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    aufAnfrage: true,
    gleichzeitigeAnrufe: '40 und mehr',
    fuerWen:
      'Für Betriebe, deren Anrufaufkommen sich nicht in eine Tabelle fügt — ' +
      'mit festem Ansprechpartner und vereinbarten Reaktionszeiten.',
  },
];

/* ------------------------------------------------------------------ *
 * Zufriedenheitsgarantie
 * ------------------------------------------------------------------ */

/**
 * Gehoert prominent auf die Seite, nicht ins Kleingedruckte — sie ist das
 * Gegenargument zur Einstiegshuerde von CHF 490 aufwaerts.
 *
 * Ein Block unter den Karten, nicht eine Zeile auf jeder: Viermal klein
 * wiederholt verliert das Argument seine Wucht.
 */
export const GARANTIE = {
  titel: '14 Tage Zufriedenheitsgarantie',
  kern: 'Nicht zufrieden? Dann fällt keine Setup-Gebühr an.',
  /** Die Fristbindung ist der Punkt, der die Zusage belastbar macht. */
  frist:
    'Die Frist beginnt mit dem Onboarding-Call, nicht mit der Vertragsunterschrift — ' +
    'Sie müssen den Assistenten im Betrieb erlebt haben, bevor sie zu laufen beginnt.',
  umfang:
    'Kündigen Sie innerhalb der 14 Tage, entfällt die Setup-Gebühr vollständig; bereits ' +
    'Gezahltes wird erstattet. Die Monats- oder Jahresgebühr für den angebrochenen ' +
    'Zeitraum wird anteilig nicht verrechnet.',
  /** Was nicht darunter faellt, steht dabei — sonst ist es eine Zusage mit
   *  stiller Ausnahme, und die faellt beim ersten Fall auf. */
  ausnahme:
    'Nicht erfasst sind verbrauchte Zusatzminuten: Sie werden zum Preis Ihres Plans ' +
    'abgerechnet. Die Garantie betrifft die Setup- und Vertragsgebühr, nicht die Nutzung.',
  gilt: 'Gilt für alle Pläne.',
} as const;

/* ------------------------------------------------------------------ *
 * Zusatzminuten
 * ------------------------------------------------------------------ */

/**
 * Kein manueller Zukauf, keine Abschaltung.
 *
 * Bei einem Kernversprechen „kein Anruf geht verloren" darf ein aufgebrauchtes
 * Kontingent den Assistenten nicht deaktivieren — sonst unterlaeuft die
 * Abrechnung genau das, wofuer der Kunde bezahlt.
 */
export const ZUSATZMINUTEN = {
  regel:
    'Überschreiten Sie Ihr Kontingent, läuft der Assistent unverändert weiter. Kein ' +
    'Abschalten, kein Unterbruch — die Mehrnutzung erscheint automatisch auf der ' +
    'nächsten Rechnung.',
  benachrichtigung:
    'Bei 80 % und bei 100 % des Kontingents erhalten Sie einen Hinweis per E-Mail und ' +
    'im Dashboard. Reine Transparenz, kein Kaufzwang.',
  beispiel:
    '225 Minuten inklusive, 300 verbraucht: 75 Zusatzminuten zu CHF 0.45 — CHF 33.75 ' +
    'auf der nächsten Rechnung.',
  staffelHinweis:
    'Der Preis je Zusatzminute sinkt mit dem Plan. Wer regelmässig überschreitet, fährt ' +
    'auf der nächsten Stufe günstiger.',
} as const;

/* ------------------------------------------------------------------ *
 * Kuendigung eines Laufzeitvertrags
 * ------------------------------------------------------------------ */

export const KUENDIGUNG = {
  titel: 'Vorzeitige Kündigung eines Laufzeitvertrags',
  regel:
    'Keine Zahlung der Restlaufzeit. Stattdessen werden die genutzten Monate rückwirkend ' +
    'zum Monatspreis statt zum Rabattpreis berechnet; die Differenz wird als ' +
    'Schlusszahlung fällig. Danach endet der Vertrag ohne weitere Verpflichtung.',
  begruendung:
    'Sie zahlen für die genutzten Monate den regulären statt den Rabattpreis, weil die ' +
    'Bindung als Gegenleistung für den Rabatt entfällt.',
  beispiel:
    '3-Jahres-Vertrag Starter zu CHF 110 im Monat, Kündigung nach 8 Monaten: rückwirkend ' +
    'CHF 148 im Monat, Differenz (148 − 110) × 8 = CHF 304 Schlusszahlung.',
  setup: 'Die Setup-Gebühr ist von einer Kündigung nicht betroffen — einmalig, nicht rückforderbar.',
} as const;

/* ------------------------------------------------------------------ *
 * Aktion
 * ------------------------------------------------------------------ */

/**
 * Aktion: derzeit KEINE.
 *
 * Bewusst leer, nicht auf ein altes Datum gesetzt. Ein Ablaufdatum, das ohne
 * Deploy still verstreicht, ist genau der Fehler aus C1 — lieber eine Luecke
 * als eine falsche Zusage. Der Build-Waechter bricht ab, sobald `gueltigBis`
 * in der Vergangenheit liegt.
 */
export const AKTION: { gueltigBis: string } | null = null;

/* ------------------------------------------------------------------ *
 * Konditionen und Upsells
 * ------------------------------------------------------------------ */

export const KONDITIONEN = [
  'Alle Preise in CHF, exkl. MwSt.',
  'Setup-Gebühr einmalig, bei allen Laufzeiten gleich hoch',
  'Monatlich kündbare Verträge: 30 Tage Kündigungsfrist, keine Mindestlaufzeit',
  'Laufzeitverträge verlängern sich automatisch, wenn Sie nicht 30 Tage vor Ablauf kündigen',
];

/**
 * Zusatzleistungen — bewusst nur die, die keine Funktion voraussetzen, die es
 * noch nicht gibt.
 *
 * Aus der Preisstruktur NICHT uebernommen: „Zusaetzlicher Standort" (CHF 49-79)
 * und „Zusaetzliche Sprache" (CHF 29). Beide setzen Funktionen voraus, die
 * unter GEPLANT stehen. Ein bepreister Zusatz zu einer Funktion, die es nicht
 * gibt, ist keine Ankuendigung mehr, sondern ein Angebot — mit allem, was
 * daran haengt.
 */
export const UPSELLS: { was: string; preis: string }[] = [
  { was: 'Priorisierter Support für Starter und Business', preis: 'CHF 39 im Monat' },
  { was: 'Onboarding für weiteres Personal', preis: 'CHF 150 einmalig' },
];

/* ------------------------------------------------------------------ *
 * Geplant — nicht verfuegbar, ohne Preisbezug
 * ------------------------------------------------------------------ */

/**
 * Merkmale, die noch nicht existieren, gehoeren nicht in die Leistungsliste
 * eines bezahlten Plans (Content-Audit C7). Sie stehen hier getrennt und werden
 * ohne Preisbezug ausgewiesen.
 *
 * Die Preisstruktur vom 12.08.2026 fuehrte sechs davon als enthalten. Der
 * Betreiber hat am selben Tag bestaetigt, dass keines abnahmefaehig ist —
 * bei der Terminbuchung belegt durch einen Live-Test mit drei fehlgeschlagenen
 * Werkzeugaufrufen aus drei Versuchen.
 *
 * Sobald eines abnahmefaehig ist, wandert es in `PLAENE` und verschwindet hier.
 *
 * BEWUSST OHNE PLANZUORDNUNG. Ein „geplant fuer Business" haengt die Funktion
 * wieder an eine Preisstufe — schwaecher als „enthalten", aber immer noch ein
 * Kaufargument fuer etwas, das es nicht gibt. Ohne Zuordnung ist es das, was es
 * ist: eine Ankuendigung.
 */
export const GEPLANT: string[] = [
  'Terminbuchung im Kalender',
  'SMS-Dringlichkeitsalarm ans Team',
  'Mehrere Standorte',
  'Weitere Sprachen',
  'Erweiterte Auswertungen',
  'WhatsApp-Bestätigung an Ihre Endkunden',
];
