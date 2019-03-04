REM clean && mkdir
REM del "../dist" &&^
REM mkdir "../dist/node_modules"
npm run clean &&^
npm run dev-build &&^
move %cd%\dist\index.html %cd%\dist\index.ssr.html &&^
%cd%\build\cpm.cmd &&^
echo "build for development success."