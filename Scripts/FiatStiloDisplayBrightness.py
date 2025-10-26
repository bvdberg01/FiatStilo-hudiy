import sys
import os

if __name__ == "__main__":
    if len(sys.argv) > 1:
        brightness = int(sys.argv[1])
        buffer = b'\x04\xAA\x01\x00\x00\x00'+bytes([brightness])
        with open('/dev/hidraw0','wb') as hid:
            hid.write(buffer)
    else:
        print("No variable received from Node.js.")