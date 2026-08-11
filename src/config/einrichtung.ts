/**
 * Einrichtung und Support — EINZIGE Quelle (Content-Audit C8).
 *
 * Die Zusage zur Einrichtungsdauer stand auf der alten Seite an drei Stellen
 * und war an keiner gedeckt. Sie steht deshalb hier einmal; Startseite,
 * Ablaufseite und FAQ ziehen von hier.
 *
 * POSITIONIERUNG: Der Onboarding-Call ist das Unterscheidungsmerkmal, nicht
 * die Geschwindigkeit. Nutzungsbasierte Anbieter verkaufen Selbsteinrichtung
 * in Minuten — auf dieser Achse laesst sich nicht gewinnen, und sie ist auch
 * nicht die, auf der Voxera besser ist. Die Texte fuehren deshalb mit dem
 * Gespraech und nennen die 24 Stunden als Folge, nicht als Versprechen.
 *
 * BEWUSST NICHT FORMULIERT: eine Aussage darueber, was andere Anbieter tun.
 * Vergleichende Behauptungen ohne belegte Quelle sind nach UWG angreifbar —
 * genau der Grund, aus dem die vier Vergleichszahlen (C4) von der Startseite
 * gestrichen wurden. Der Unterschied wird beschrieben, indem steht, was Voxera
 * tut; nicht, indem steht, was andere unterlassen.
 */

export const EINRICHTUNG = {
  /** Der erste Schritt. Kein Nebensatz. */
  gespraech: {
    titel: 'Onboarding-Call',
    kurz: 'Wir richten Voxera gemeinsam mit Ihnen ein — in einem Gespräch, nicht in einem Formular.',
    lang:
      'Am Anfang steht ein Gespräch. Darin klären wir, wer bei Ihnen anruft und weshalb, ' +
      'welche Anliegen häufig sind, was dringend ist und was warten kann, und wie der ' +
      'Assistent sich melden soll. Aus diesen Antworten konfigurieren wir ihn — Sie ' +
      'müssen weder Ablauflogik zusammenklicken noch Beispielsätze schreiben.',
  },

  /** Die Dauer gilt ab dem Gespraech, nicht ab der Anmeldung. */
  dauer: {
    wert: '24 Stunden',
    aussage: 'Nach dem Onboarding-Call ist Voxera innerhalb von 24 Stunden einsatzbereit.',
    /** Praezisierung, damit die Zusage nicht als Gesamtdauer ab Vertrag gelesen wird. */
    abgrenzung:
      'Die 24 Stunden zählen ab dem Gespräch. Wann das Gespräch stattfindet, bestimmen Sie.',
  },

  support: {
    email: 'info@voxera.ch',
    wegErst: 'Anfragen erreichen uns am schnellsten per E-Mail an info@voxera.ch.',
    telefonisch:
      'Telefonisch sind wir über den Voxera-Assistenten erreichbar — er nimmt den Anruf ' +
      'entgegen, erfasst Ihr Anliegen und meldet es uns.',
    /** Nicht als Werbespruch gemeint, sondern als pruefbare Aussage: Wir setzen
     *  das Produkt fuer die eigene Erreichbarkeit ein. Wer anruft, hoert es. */
    hinweis: 'Das ist derselbe Assistent, den Sie einsetzen würden.',
  },
} as const;
