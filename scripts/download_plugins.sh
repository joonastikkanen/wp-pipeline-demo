#!/bin/bash
cd /var/www/html/wp-content/plugins
for PLUGIN in $1
do
  echo "DOWNLOADING WORDPRESS PLUGIN "$PLUGIN_NAME
  PLUGIN_NAME=`awk -F"|" '{print $1}' $PLUGIN`
  PLUGIN_VERSION=`awk -F"|" '{print $2}' $PLUGIN`
  wget https://downloads.wordpress.org/plugin/$PLUGIN_NAME.$PLUGIN_VERSION.zip
  unzip $PLUGIN_NAME.$PLUGIN_VERSION.zip
  rm $PLUGIN_NAME.$PLUGIN_VERSION.zip
  echo $PLUGIN_NAME " INSTALLED"
  echo
done
