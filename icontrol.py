#!/usr/bin/env python

import time
from flask import Flask, jsonify
from flask import render_template
import RPi.GPIO as GPIO

RELAY1 = 23
RELAY2 = 24

BASE_URL = ''
LONG_POLL_TIMEOUT = 120

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('icontrol.html')


@app.route("/control/lstatus/<cur>")
def lstatus(cur):
    s1 = int(cur[0])
    s2 = int(cur[1])
    timeout = time.time() + LONG_POLL_TIMEOUT
    while time.time() < timeout:
        # poll new state if change return
        if s1 != GPIO.input(RELAY1) or s2 != GPIO.input(RELAY2):
            break
        time.sleep(1)
    return jsonify(state=[GPIO.input(RELAY1), GPIO.input(RELAY2)])


@app.route("/control/status")
def status():
    return jsonify(state=[GPIO.input(RELAY1), GPIO.input(RELAY2)])


@app.route("/control/status/<new>")
def set_status(new):
    s1 = int(new[0])
    s2 = int(new[1])
    GPIO.output(RELAY1, s1)
    GPIO.output(RELAY2, s2)
    return jsonify(state=[GPIO.input(RELAY1), GPIO.input(RELAY2)])


if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(RELAY1, GPIO.OUT)
    GPIO.setup(RELAY2, GPIO.OUT)

    app.debug = True
    app.run('0.0.0.0', port=80, threaded=True)
