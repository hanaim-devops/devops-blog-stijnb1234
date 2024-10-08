# Highlight.io DevOps Blog

In deze repository vind je de broncode voor de Highlight.io DevOps blog. Het blog staat in een mdbook verwerkt, zodat deze eenvoudig te lezen is en later eventueel op de site verwerkt kan worden.

## Markdown boek

### Lokaal draaien

Om het boek lokaal te draaien, moet je Rust & Cargo geïnstalleerd hebben. Vervolgens kun je het boek starten met `./serve.sh`. Het boek is dan te vinden op http://localhost:3000.

### In Docker draaien

Je kunt het boek ook in Docker draaien. Hiervoor moet je Docker geïnstalleerd hebben. Vervolgens kun je het boek starten met `./build.sh`. Het boek is dan te vinden op http://localhost:8081.

## Integratie voorbeelden

In de map `basic-examples` staan een aantal voorbeelden van de integratie van Highlight.io in specifieke programmeertalen. Deze mappen kunnen worden geopend met een IDE die de betreffende taal ondersteunt.

In de map `full-stack-example` staat een voorbeeld van een full-stack applicatie die gebruik maakt van Highlight.io. De frontend is geschreven in React (JS) en de backend met Flask (Python). Het voorbeeld kan worden gestart door het `./run.sh` script in de map uit te voeren. De frontend is dan te vinden op http://localhost:3000 en de backend (API) op http://localhost:5000.