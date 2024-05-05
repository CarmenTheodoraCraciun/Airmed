@echo off
@REM go into foldel frontend
cd /d "%~dp0frontend"
@REM open powershell and execute npm run dev
start powershell.exe -NoExit -Command "npm run dev"