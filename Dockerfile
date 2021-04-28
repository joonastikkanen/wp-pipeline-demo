FROM wordpress:5.7.1-php8.0-apache
LABEL maintainer "Joonas Tikkanen <joonas.tikkanen@ambientia.fi>"

RUN apt-get update && \
    apt-get -y install libfreetype6 libfreetype6-dev wget unzip

COPY conf/ports.conf /etc/apache2/ports.conf

COPY wp-content/plugins /usr/src/wordpress/wp-content/plugins
COPY wp-content/themes /usr/src/wordpress/wp-content/themes

VOLUME /var/www/html/wp-content/uploads

COPY scripts/download_plugins.sh /tmp
COPY wp_plugins.txt /tmp

RUN /tmp/download_plugins.sh /tmp/wp_plugins.txt && \
    rm /tmp/download_plugins.sh /tmp/wp_plugins.txt

EXPOSE 8080
