FROM node:22-bookworm AS assets

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources ./resources
COPY vite.config.js ./
RUN npm run build

FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --ignore-platform-req=ext-pdo_pgsql \
    --ignore-platform-req=ext-pdo_mysql

FROM php:8.3-apache-bookworm

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
ENV PORT=10000

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq-dev \
    && docker-php-ext-install \
        pdo_mysql \
        pdo_pgsql \
    && printf "ServerName localhost\n" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername \
    && a2enmod rewrite headers \
    && sed -ri "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/*.conf \
    && sed -ri "s!/var/www/!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build
COPY docker/render-start.sh /usr/local/bin/render-start

RUN chmod +x /usr/local/bin/render-start \
    && touch database/database.sqlite \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 10000

CMD ["render-start"]
