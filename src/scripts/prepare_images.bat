@echo off
REM prepare_images.bat - wrapper to run PowerShell generation script prepare_images.ps1
REM Usage: prepare_images.bat [ImagesRoot]
REM Example: prepare_images.bat ..\assets\images

SETLOCAL
SET SCRIPT_DIR=%~dp0
FOR %%I IN ("%SCRIPT_DIR%") DO SET SCRIPT_DIR=%%~fI

REM Ensure trailing backslash
IF NOT "%SCRIPT_DIR:~-1%"=="\" SET SCRIPT_DIR=%SCRIPT_DIR%\

REM Check that PowerShell script exists
IF NOT EXIST "%SCRIPT_DIR%prepare_images.ps1" (
  echo ERROR: prepare_images.ps1 not found in %SCRIPT_DIR%
  ENDLOCAL
  EXIT /B 2
)

REM If first arg is -h or /? print usage
IF "%~1"=="-h" (
  echo Usage: %~nx0 [ImagesRoot]
  echo.
  echo If ImagesRoot is omitted, script will use the default assets/images folder under the project.
  ENDLOCAL
  EXIT /B 0
)
IF "%~1"=="/?" (
  echo Usage: %~nx0 [ImagesRoot]
  ENDLOCAL
  EXIT /B 0
)

REM NOTE: Before running this script, convert new images to .webp by hand, folder by folder.

REM Call PowerShell script with ExecutionPolicy bypass. Forward all args.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%prepare_images.ps1" %*
SET EXITCODE=%ERRORLEVEL%
IF %EXITCODE% NEQ 0 (
  echo prepare_images.bat: PowerShell script exited with code %EXITCODE%.
  ENDLOCAL
  EXIT /B %EXITCODE%
)
echo prepare_images.bat: Completed successfully.
ENDLOCAL
EXIT /B 0
