#!/usr/bin/env python

import RPi.GPIO as GPIO
import os
import time

# Set up the GPIO pins
GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)

start_time = 0

# Function to be called when the GPIO pin goes high
def shutdown(channel):
    global start_time
    start_time = time.time()

# Function to be called repeatedly to check if the pin has been high for 30 seconds
def check_shutdown():
    global start_time
    print(GPIO.input(24))
    if (GPIO.input(24) == 1) and (time.time() - start_time >= 5):
        print("Shutdown")
	os.system("sudo shutdown -h now");

# Set up an event on the GPIO pin to call the function when the pin goes high
GPIO.add_event_detect(24, GPIO.RISING, callback=shutdown, bouncetime=200)

# Run the script indefinitely
while True:
    check_shutdown()
    time.sleep(1)

