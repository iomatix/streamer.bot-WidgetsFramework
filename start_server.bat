@echo off
set PORT=%1

if "%PORT%"=="" (
    set PORT=8181
)

echo Running server on port %PORT%...
python run_widget_server.py %PORT%

pause