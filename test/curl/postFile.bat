@echo off

set "URL_FILE=C:\Users\CREINOSO\Documents\projects\akamai\test\curl\urls.txt"
set "DATA={\"objects\":["

for /f "usebackq delims=" %%A in ("%URL_FILE%") do (
    set "URL=%%A"
    echo URL: !URL!
    setlocal enabledelayedexpansion
    set "URL=!URL:"=!"
    echo URL after removing quotes: !URL!
    endlocal
	
    set "DATA=!DATA!\"!URL!\","
    echo DATA: !DATA!
)

REM Remove the trailing comma and close the JSON object
set "DATA=%DATA:~0,-1%]}"
echo Sending data: %DATA%

curl -X POST "http://localhost:3000/api/akamai" ^
-H "accept: application/json" ^
-H "content-type: application/json" ^
-d "%DATA%"

echo.

pause
