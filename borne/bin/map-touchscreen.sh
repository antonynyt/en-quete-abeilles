#!/bin/bash
export DISPLAY=:0

# Touch Screen exists
if ! xinput list | grep -q "ILITEK ILITEK-TP"; then
  echo "Touchscreen ILITEK ILITEK-TP not found."
  exit 1
fi

# HDMI-1 is available
if ! xrandr | grep -q "HDMI-1 connected"; then
  echo "HDMI-1 not connected."
  exit 1
fi

xinput map-to-output "ILITEK ILITEK-TP" HDMI-1