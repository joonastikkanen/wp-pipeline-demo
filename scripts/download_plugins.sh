#!/bin/bash
PLUGINS_FOLDER=/var/www/html/wp-content/plugins
for PLUGIN in $1
do
  echo "DOWNLOADING WORDPRESS PLUGIN "$PLUGIN_NAME
  PLUGIN_NAME=`awk -F"|" '{print $1}' $PLUGIN`
  PLUGIN_VERSION=`awk -F"|" '{print $2}' $PLUGIN`
  wget https://downloads.wordpress.org/plugin/$PLUGIN_NAME.$PLUGIN_VERSION.zip -O $PLUGINS_FOLDER/$PLUGIN_NAME.$PLUGIN_VERSION.zip
  unzip $PLUGINS_FOLDER/$PLUGIN_NAME.$PLUGIN_VERSION.zip -d $PLUGINS_FOLDER
  rm $PLUGINS_FOLDER/$PLUGIN_NAME.$PLUGIN_VERSION.zip
  echo "WORDPRESS PLUGIN "$PLUGIN_NAME " INSTALLED"
  echo
done
