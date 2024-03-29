=====================
Auto Electric Blanket
=====================

-----------------------------------------------------------
A home automation project.
-----------------------------------------------------------

- Author: gbmhunter <gbmhunter@gmail.com> (http://www.cladlab.com)
- First Ever Commit: 2013/10/05
- Last Modified: 2013/11/09
- Version: v1.0.1.0
- Company: CladLabs
- Language: n/a
- Compiler: n/a
- uC Model: n/a
- Computer Architecture: n/a
- Operating System: n/a
- Documentation Format: n/a
- License: GPLv3

Description
===========

The Android app can be installed by copying the .apk (android/workspace/AutoElectricBlanket/bin/AutoElectricBlanket.apk) file onto your phone, and then running the APK installer app (that can be downloaded from Google Play).

External Dependencies
=====================

nodejs

Issues
======

See BitBucket issues.

Usage
=====

n/a
	
Changelog
=========

========= ========== ===================================================================================================
Version   Date       Comment
========= ========== ===================================================================================================
v1.0.1.0  2013/11/09 Changed the port from 8000 to 8001 as 8000 was being used by a 'USB server' on the Orcon router. Updated both the web app and the Android app with this change. Added the command 'sudo ifup wlan0' to the startup script, as this fixed issues with getting a static IP on the RaspberryPi (after configuring etc/network/interfaces with the required information).
v1.0.0.1  2013/11/07 Added installation info about the Android app to the README.
v1.0.0.0  2013/11/07 Code released as v1.0.0.0. 
v0.9.4.0  2013/11/07 Changed index.html URL so that it loads when going to root web site address. Fixed Android app URL so it points to the DynamicDNS URL.
v0.9.3.0  2013/11/06 Increase switch input GPIO check time to make it more responsive to presses.
v0.9.2.0  2013/11/01 Online LED now checks that it can resolve google.com every 5s, and if not, turns off, giving a more accurate indication of whether the device is connected to the internet or not.
v0.9.1.0  2013/10/26 Online LED now lights up when the server starts.
v0.9.0.0  2013/10/26 Web server on RaspberryPi now starts up automatically on boot-up. Added startup.sh for this purpose.
v0.8.0.0  2013/10/26 Electric blanket can now be controlled via web interface with 4 different power levels. Added bootstrap-slider which is a slider element for the web page, with touch support.
v0.7.0.0  2013/10/26 Electric blanket relay can now be controlled to 4 different power levels (including off), when the push button is pressed.
v0.6.3.0  2013/10/26 Push button now turns the high power LED on/off (just for testing).
v0.6.2.0  2013/10/26 Relay is controllable (on/off) with variable gpioRelay in server.js.
v0.6.1.0  2013/10/26 GPIO for power levels, power itself, and when server is online have been added to script. Turns on all LEDs at once when on/off button is pressed on website.
v0.6.0.0  2013/10/14 Android app now loads RaspberryPi web page (internal IP address of 192.168.8.113:8000/view/index.html), sliding button (Twitter style) works fine, and you are able to turn the LED on/off correctly.
v0.5.0.0  2013/10/14 Started Android app development. Got basic 'dummy project' working on Samsung phone. Add .gitignore file with ignore matches for Android and Eclipse.
v0.4.1.0  2013/10/14 Fixed issue with page changing when clicking button by using AJAX requests. Uses the post method provided by jQuery.
v0.4.0.0  2013/10/08 You can now toggle the electric blanket on/off without really changing page (it does, but page does not exist, so it takes ages, yes, this is a hack). Need to go to /view/index.html to start the process.
v0.3.0.0  2013/10/08 Server now serves up static pages, and can provide css and js for bootstrap-switches module. Got rid of the js folder as it was causing issues, but all js files in root dir.
v0.2.2.0  2013/10/07 Added bootstrap switch repo. Added index.html in /view/. server.js now serves up a static web file on homepage request, however it doesn't render correctly.
v0.2.1.0  2013/10/07 Moved node code and associated sub-directories into /js/.
v0.2.0.0  2013/10/07 Basic on/off commands work by typing URL:8000/on or URL:8000/off once node server has started.
v0.1.1.1  2013/10/07 Updated README with correct version information.
v0.1.1.0  2013/10/05 Installed express module for node. Renamed http-server.js to just server.js. Added routes/api.js.
v0.1.0.1  2013/10/05 Added README in root repo directory.
v0.1.0.0  2013/10/05 Initial commit. Basic server turning on GPIO pin for 3 seconds.
========= ========== ===================================================================================================