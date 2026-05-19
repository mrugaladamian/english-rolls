#!/usr/bin/env bash
set -euo pipefail

port="${PORT:-10000}"

if [[ -z "${APP_URL:-}" && -n "${RENDER_EXTERNAL_URL:-}" ]]; then
    export APP_URL="${RENDER_EXTERNAL_URL}"
fi

sed -ri "s/^Listen .*/Listen ${port}/" /etc/apache2/ports.conf
sed -ri "s/<VirtualHost \*:.*>/<VirtualHost *:${port}>/" /etc/apache2/sites-available/000-default.conf

mkdir -p \
    storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache

php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec apache2-foreground
