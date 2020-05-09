FROM php:7.2-apache
RUN apt-get update && \
  # PHPのExtensionをインストール．
  docker-php-ext-install pdo_mysql mysqli mbstring

WORKDIR /work

EXPOSE 80