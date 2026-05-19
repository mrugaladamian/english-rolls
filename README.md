# English Rolls

Mikroserwis Laravel do nauki podstawowych angielskich słówek dla osób polskojęzycznych.

## Lokalnie

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
npm run build
php artisan serve
```

## Render.com

Projekt jest przygotowany do deployu jako Docker Web Service przez `render.yaml`.

1. Podłącz repozytorium w Render.
2. Wybierz Blueprint albo Web Service z Dockerfile.
3. Ustaw `APP_KEY` w Environment na wynik:

```bash
php artisan key:generate --show
```

Domyślna konfiguracja produkcyjna używa logów na `stderr`, sesji/cache w plikach i SQLite. Aplikacja nie wymaga zewnętrznej bazy danych dla obecnego zakresu funkcji.
