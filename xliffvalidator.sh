#!/bin/bash
export CURRENT=$PWD
cd `dirname "$0"`
export XLIFFVALIDATOR_HOME=$PWD
cd $CURRENT
node $XLIFFVALIDATOR_HOME/XLIFFValidator.js $@
