# Das Lehrerzimmer – Zwischen Verdacht und Verantwortung

Anspruchsvolle Lerneinheit für Sekundarstufe II / FMS mit 17 Analyseaufträgen, Rückmeldungen zu Einträgen und 28 Belegkarten auf Basis des bereitgestellten Transkripts.

**[Live-Lerneinheit](https://patrickfischerksa.github.io/das-lehrerzimmer-lerneinheit/)** · [Repository](https://github.com/PatrickFischerKSA/das-lehrerzimmer-lerneinheit)

## Arbeiten mit der Einheit

`index.html` öffnen oder die Live-Adresse aufrufen. Der Film wird über den direkten [SRF-Play-Link](https://www.srf.ch/play/tv/-/video/-?urn=urn:srf:video:e0c28018-3912-4d4c-a91d-2100472543e7) in einem separaten Tab angesehen. Die Einheit benötigt keine lokale Filmdatei, Installation, API-Schlüssel oder externen Bibliotheken.

1. Eigene Analyse schreiben. Die Antwortfelder unterstützen These, Beleg, Begründung und Gegenlesart, ohne diese Form verbindlich vorzuschreiben.
2. «Eintrag prüfen & Diskussion vertiefen» wählen.
3. Textsignale, aufgabenspezifischen Prüfpunkt und Gegenposition prüfen.
4. Passende Belegkarten öffnen; Aussagekraft und Grenzen der Auszüge diskutieren.
5. Eintrag überarbeiten und erneut prüfen. Geänderte Einträge kennzeichnen ältere Rückmeldungen als veraltet.
6. Das Analysejournal einschliesslich angeforderter Rückmeldungen, Belegen und Diskussionsfragen exportieren.

Die Belegkarten und Rückmeldungen enthalten Spoiler. Das Ersturteil vor der Sichtung zunächst ohne sie formulieren. Die vollständige Ausarbeitung benötigt etwa 8–10 Lektionen à 45 Minuten einschliesslich Film, Diskussion und Revision. Kürzung über die Auswahl von Aufgaben möglich.

## Was die Rückmeldung leistet

Die Prüfung läuft vollständig lokal im Browser. Sie erkennt Belegkennungen, Absatzverweise in Kartenbereichen, Zeitcodes sowie typische sprachliche Signale für Begründung, Gegenposition und Einschränkung. Sie reagiert auf fehlende und ungültige Verweise. Aufgabenspezifische Kommentare erläutern Schlussprobleme, konkurrierende Lesarten und nächste Überarbeitungsschritte. Belege sind thematisch zugeordnet; genannte bekannte Belegkarten werden zusätzlich einbezogen.

**Keine KI-Korrektur oder semantische Bewertung:** Ein erkanntes «weil» beweist keine gute Begründung. Ein B-Verweis beweist keine passende Verwendung der Stelle. Alternative Formulierungen können ohne erkanntes Signal fachlich überzeugend sein. Es gibt weder automatische Noten noch einen Qualitätspunktestand. Auf diese Grenzen weist die Oberfläche ausdrücklich hin. Inhaltliche Rückmeldung entsteht im Abgleich von eigenem Text, Prüfimpuls und Belegen und im anschliessenden Gespräch.

## Referenztext und Fundstellen

Quelle: vom Nutzer bereitgestellte Datei «Transkript Lehrerzimmer.docx». Das Original enthält 723 direkte Textabsätze einschliesslich Überschriften und Leerabsätzen. P0001 bezeichnet den ersten solchen Absatz; die Zählung ist keine Seitenzählung oder Filmzeit. Nur normale und geschützte Leerzeichen sowie äussere Leerzeichen werden für die Zitierprüfung vereinheitlicht. Jeder veröffentlichte Zitat-Auszug wurde auf exaktes Vorkommen im angegebenen Absatz geprüft.

Der Text enthält erkennbare automatische Transkriptionsfehler, keine verlässlichen Sprechermarkierungen und keine Zeitcodes. Die Schlusssequenz ist stark lückenhaft. Deshalb keine erfundenen Szenenzeiten, keine verbindliche Wortlautanalyse fehlerhafter Fremdsprachenpassagen und keine Kamera- oder Mimikbehauptungen aus dem Transkript. Filmische Mittel müssen bei der Filmsichtung nachgewiesen werden. Kontextbeschreibungen und Interpretationen sind von Zitaten getrennt.

Das vollständige DOCX, vollständige Transkript und Video werden nicht veröffentlicht. Die 28 ausgewählten Belegkarten enthalten kurze, für die Aufgaben relevante Auszüge. Die ursprünglichen Aufgaben wurden anhand des Referenztexts vertieft. Zusätzliche fachliche Orientierung: [ZDF](https://presseportal.zdf.de/pressemappe/das-lehrerzimmer) und [kinofenster](https://www.kinofenster.de/50502/das-lehrerzimmer).

## Materialien

- [Arbeitsblatt mit Überarbeitungsimpulsen](materialien/arbeitsblatt.md)
- [Belegheft mit Zitaten, Fundstellen und Streitfragen](materialien/belegheft.md)
- [Unterrichtsplanung und Bewertungsraster](materialien/lehrpersonen.md)

Lösungshinweise und Belege sind öffentlich; kein geschützter Lehrpersonenbereich.

## Speicherung und Datenschutz

Antworten und Häkchen verbleiben unter `lehrerzimmer-v1` im Local Storage. Bestehende Einträge der ersten Fassung bleiben erhalten; die Aufgaben sind inzwischen anspruchsvoller formuliert. Speicherung ist geräte-, browser- und ursprungsgebunden und kann bei `file://` oder privaten Sitzungen eingeschränkt sein. Rückmeldungen bleiben nur während der geöffneten Sitzung sichtbar und können jederzeit aus dem gespeicherten Eintrag neu erzeugt werden. Ein Export sichert beides; es gibt keinen Import und keine Synchronisation.

Auf gemeinsam genutzten Geräten nach dem Export die Antworten löschen. Keine Eingaben werden an einen KI-Dienst oder Server gesendet. Keine Tracker, CDNs oder externen Webfonts in dieser Einheit. SRF Play und externe Quellen haben eigene Zugangs- und Datenschutzbedingungen.

## Entwicklung und GitHub Pages

Statische HTML/CSS/JS-Dateien. Daten und Fachkommentare: `feedback-data.js`; reine Textsignalprüfung: `feedback-engine.js`; Oberfläche, Speicherung und Export: `app.js`. Keine Builds nötig.

Prüfen:

```sh
node --check app.js
node --check feedback-data.js
node --check feedback-engine.js
node --test tests/feedback.test.js
```

Der Pages-Workflow führt diese Prüfungen aus und veröffentlicht Pushes auf `main`. In den Repository-Einstellungen muss Pages als Quelle «GitHub Actions» verwenden. Relative Ressourcenpfade unterstützen den Projekt-Unterpfad. Die automatisch erzeugten Antworten sind kein Serverinhalt.

Keine öffentliche Lizenz für den Code oder die Unterrichtstexte vorgegeben. Film und Referenztext werden durch die GitHub-Veröffentlichung nicht allgemein zur Weiterverwendung freigegeben.
