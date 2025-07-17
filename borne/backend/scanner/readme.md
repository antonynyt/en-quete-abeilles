# Scanner Configuration & Usage Guide

This guide explains how to configure and use the BarcodeScanner class with the Waveshare 1D/2D Scanner Module (C) in USB Serial mode.

## 1. Configure the Scanner

- Scan the "USB Virtual Port" QR configuration code from the Waveshare PDF (page 18):
  [Waveshare Barcode Scanner Module (C) Documentation](https://www.waveshare.com/wiki/Barcode_Scanner_Module_(C))
- After scanning, check the device connection:
  - Plug in the scanner and run:
    ```sh
    ls /dev/tty.usb*
    ```
  - Unplug and repeat to confirm the device appears/disappears.

## 2. Using the BarcodeScanner Class

```js
import BarcodeScanner from './scanner.js';

const PORTPATH = '/dev/tty.usbmodem2027300413411'
const scanner = new BarcodeScanner(PORTPATH);

// Handle scanner events
scanner.on('open', () => console.log('Serial port open. Ready to scan!'));
scanner.on('error', (err) => console.error('Serial error:', err.message));
scanner.on('data', (barcode) => {
  console.log('Barcode scanned:', barcode);
});
```

- The `open` event signals the serial port is ready.
- The `error` event provides error details.
- The `data` event returns scanned barcode values.

## Troubleshooting
- Ensure the scanner is in USB Serial mode.
- Confirm the serial port path (e.g., `/dev/tty.usb*`).
- Check permissions for accessing serial devices.

## Reference
- [Waveshare Barcode Scanner Module (C) Documentation](https://www.waveshare.com/wiki/Barcode_Scanner_Module_(C))
