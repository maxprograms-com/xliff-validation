@echo off
pushd "%~dp0" 
set XLIFFVALIDATOR_HOME=%CD%
popd
node %XLIFFVALIDATOR_HOME%\XLIFFValidator.js %* 