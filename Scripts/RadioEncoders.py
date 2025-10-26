#!/usr/bin/env python3
import subprocess
import re
from time import sleep
from RPi import GPIO

STEP = 5

def get_volume():
    """Huidig volume uitlezen als percentage."""
    try:
        out = subprocess.check_output(["amixer", "get", "Master"], text=True)
    except subprocess.CalledProcessError:
        return None
    m = re.search(r"(\d{1,3})%\]", out)
    if m:
        return int(m.group(1))
    return None

def set_volume(pct):
    """Volume zetten tussen 0-100%."""
    pct = max(0, min(100, int(pct)))
    subprocess.run(["amixer", "set", "Master", f"{pct}%"])

def increase_volume():
    v = get_volume()
    if v is None: return
    new = min(100, v + STEP)
    set_volume(new)
    print(f"Volume ↑: {v}% -> {new}%")

def decrease_volume():
    v = get_volume()
    if v is None: return
    new = max(0, v - STEP)
    set_volume(new)
    print(f"Volume ↓: {v}% -> {new}%")

def listen_for_volume_encoder():
    try:
        # GPIO pinnen voor linker encoder
        Lclk = 3
        Ldt = 2

        GPIO.setmode(GPIO.BCM)
        GPIO.setup(Lclk, GPIO.IN)
        GPIO.setup(Ldt, GPIO.IN)

        LclkLastState = GPIO.input(Lclk)

        print("Volume controller actief via GPIO!")

        while True:
            LLclkState = GPIO.input(Lclk)
            LLdtState = GPIO.input(Ldt)
            if LLclkState != LclkLastState:
                if LLdtState != LLclkState:
                    decrease_volume()
                else:
                    increase_volume()
            LclkLastState = LLclkState
            sleep(0.01)

    finally:
        GPIO.cleanup()

if __name__ == "__main__":
    listen_for_volume_encoder()
