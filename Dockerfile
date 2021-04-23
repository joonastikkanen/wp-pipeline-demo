FROM wordpress:5.7.1-php8.0-apache
LABEL maintainer "Joonas Tikkanen <joonas.tikkanen@ambientia.fi>"

RUN apt-get update && \
    apt-get -y dist-upgrade && \
    apt-get -y install libfreetype6 libfreetype6-dev

COPY ./* wp-content

VOLUME wp-content/uploads

EXPOSE 8080