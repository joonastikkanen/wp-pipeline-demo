FROM wordpress:5.7.1-php8.0-apache
LABEL maintainer "Joonas Tikkanen <joonas.tikkanen@ambientia.fi>"

RUN apt-get update && \
    apt-get -y dist-upgrade && \
    apt-get -y install libfreetype6 libfreetype6-dev

COPY conf/ports.conf /etc/apache2/ports.conf

COPY wp-content/plugins wp-content/plugins
COPY wp-content/themes wp-content/themes

VOLUME /var/www/html/wp-content/uploads

COPY scripts/download_plugins.sh .
COPY wp_plugins.txt .

RUN ./download_plugins.sh wp_plugins.txt && \
    rm download_plugins.sh wp_plugins.txt

RUN find /var/www/html -type f -exec chmod 644 {} + && \
    find /var/www/html -type d -exec chmod 755 {} + && \
    chown -R www-data:www-data /var/www/html

EXPOSE 8080
