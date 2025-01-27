# Klijent

Ovaj projekt je generiran korištenjem [Angular CLI](https://github.com/angular/angular-cli) verzije 19.1.3.

## Instalacija

Za instalaciju potrebnih biblioteka, navigirajte do direktorija projekta i pokrenite:

```bash
npm install
```

## Razvojni poslužitelj

Za pokretanje lokalnog razvojnog poslužitelja, pokrenite:

```bash
ng serve
```

## Pokretanje jediničnih testova

Za izvršavanje jediničnih testova s [Karma](https://karma-runner.github.io) testnim okvirom, koristite sljedeću naredbu:

```bash
ng test
```

## Metode testiranja

Ovaj projekt koristi nekoliko metoda testiranja kako bi osigurao kvalitetu i pouzdanost koda:

- **Jedinični testovi**: Koristimo [Karma](https://karma-runner.github.io) i [Jasmine](https://jasmine.github.io) za jedinično testiranje. Ovi testovi pokrivaju pojedinačne komponente i servise kako bi se provjerila njihova funkcionalnost u izolaciji.

## Kontinuirana integracija

Integrirao sam GitHub Actions za kontinuiranu integraciju. Radni tijek je definiran u `.github/workflows/node.js.yml` datoteci i uključuje sljedeće korake:

- **Instalacija paketa**: Instalira potrebne npm pakete.
- **Jedinični testovi**: Izvršava `ng test --watch=false` za pokretanje jediničnih testova.

Ova postavka osigurava da se svaki push zahtjev na <i>main</i> branch automatski testira, pomažući u održavanju kvalitete koda i ranom otkrivanju grešaka.