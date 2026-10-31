# Das Lehrerzimmer – Zwischen Verdacht und Verantwortung

Deutschsprachige, statische Lerneinheit für Sekundarstufe II / FMS zu İlker Çataks Film mit Leonie Benesch. Ohne Installation, Backend, API-Schlüssel oder externe Bibliotheken.

## Start

`index.html` im Browser öffnen. Die Schaltfläche «SRF Play öffnen» führt direkt zum bereitgestellten Filmangebot in einem zweiten Tab. Zeitcodes von Hand aus dem SRF-Play-Player in die Notizen übernehmen. Die Lerneinheit bettet den Stream nicht ein und benötigt keine lokale Filmdatei.

Der direkte SRF-Play-Link wurde vom Nutzer bereitgestellt. Die Wiedergabe und aktuelle Verfügbarkeit konnten bei der Erstellung nicht unabhängig geprüft werden.

## Enthalten

- Sechs Stationen: Einstieg, Sichtung, Figuren und Eskalation, Filmanalyse, Dilemma-Rat, Schreibatelier.
- SRF-Play-Verknüpfung mit Anleitung für die externe Filmsichtung.
- 17 Antwortfelder, lokaler Fortschritt, Markdown-Export und Druckansicht.
- [Arbeitsblatt](materialien/arbeitsblatt.md) und [Hinweise für Lehrpersonen](materialien/lehrpersonen.md) mit Bewertungsraster.

Zeitbedarf: rund 220–225 Minuten einschliesslich einer ca. 95–100-minütigen Filmsichtung, zuzüglich Pausen und zusätzlicher Wiederholungen. Der Schreibauftrag kann als Hausarbeit vergeben werden.

## GitHub und GitHub Pages

1. Ein neues GitHub-Repository anlegen und **den Inhalt dieses Ordners** hochladen; `index.html` muss im Repository-Hauptverzeichnis liegen. Versteckte `.github`-Dateien ebenfalls übernehmen.
2. Unter **Settings → Pages → Build and deployment → Source** «GitHub Actions» wählen.
3. Unter **Actions → Deploy learning unit to Pages → Run workflow** die Veröffentlichung starten. Bei späteren Pushes auf `main` startet der Workflow automatisch.
4. Die veröffentlichte Adresse steht im abgeschlossenen Deployment. Alternativ funktioniert «Deploy from a branch», Branch `main`, Ordner `/ (root)` ohne Actions-Workflow.

Der Workflow setzt keine Domain und keine Repository-URL voraus. Alle internen Ressourcen verwenden relative Pfade und funktionieren auch unter einem Projekt-Unterpfad. Es wurde kein GitHub-Repository angelegt und nichts veröffentlicht.

## Speicherung und Datenschutz

Antworten und Häkchen liegen unter `lehrerzimmer-v1` im Local Storage des Browsers. Sie sind geräte-, browser- und ursprungsgebunden. Bei `file://` kann die Speicherung eingeschränkt sein. Exportieren ist die verlässlichere Sicherung. Es gibt keinen Import und keine Synchronisation. Auf gemeinsam verwendeten Geräten nach dem Export die Antworten löschen.

Der Film wird auf SRF Play angesehen. Es wird keine Filmdatei hochgeladen oder lokal ausgewählt. Die Plattform hat eigene Konto-, Zugangs- und Datenschutzbedingungen. In der Lerneinheit selbst gibt es keine Tracker, CDNs, Webfonts oder automatischen externen Requests; externe Seiten werden erst bei Aufruf eines Links geöffnet.

## Materialbasis und Grenzen

Die Filmsichtung ist auf SRF Play ausgerichtet. Keine Volltranskription, keine vollständige inhaltliche Sichtung und keine verifizierten Szenenzeitcodes als Erstellungsgrundlage. Deshalb erarbeiten Lernende die Zeitbelege selbst. Laufzeit und Vorspann können je nach Fassung variieren. Filmquelle: [Das Lehrerzimmer auf SRF Play](https://www.srf.ch/play/tv/-/video/-?urn=urn:srf:video:e0c28018-3912-4d4c-a91d-2100472543e7). Der direkte Link wurde vom Nutzer bereitgestellt; keine unabhängige Wiedergabeprüfung.

Fakten und fachliche Orientierung wurden am 31.10.2026 mit [ZDF](https://presseportal.zdf.de/pressemappe/das-lehrerzimmer) und [kinofenster](https://www.kinofenster.de/50502/das-lehrerzimmer) abgeglichen. Aufgaben und Lösungshinweise sind eigenständig formuliert. Keine übernommenen Arbeitsblätter, Filmstills, Dialogabschriften oder Filmdateien im Repository.

## Rechte und Weiterverwendung

Die technische Eignung für GitHub ist keine Rechtefreigabe für den Film. Eine eigene zulässige Filmquelle ist für den Unterricht erforderlich. `.gitignore` schliesst übliche Medienformate aus. Für diese neu erstellten Unterrichtstexte und den Code ist keine öffentliche Lizenz vorgegeben; die herausgebende Person kann vor Veröffentlichung eine passende Lizenz ergänzen. Rechte am Film und an verlinkten Materialien bleiben bei den jeweiligen Rechteinhabern.

## Prüfung

JavaScript-Syntax: `node --check app.js`. Links und IDs werden lokal geprüft. Druckfunktion über den Browserdialog; «Als PDF sichern» wählen. Lösungshinweise sind didaktische Orientierung, keine automatisch korrigierbare Musterantwort und kein geschützter Lehrpersonenbereich.
