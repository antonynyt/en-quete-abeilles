import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { EventEmitter } from 'events';

/**
 * Class representing a barcode scanner connected via serial port.
 * @extends EventEmitter
 */
class BarcodeScanner extends EventEmitter {
  /**
   * Create a barcode scanner instance.
   * @param {string} portPath - The path to the serial port device (default: '/dev/tty.usbmodem2027300413411').
   * @param {number} baudRate - The baud rate for the serial connection (default: 9600).
   */
  constructor(portPath, baudRate = 9600) {
    super();
    this.port = new SerialPort({ path: portPath, baudRate });
    this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r' }));
    
    // Set up event handlers
    this.port.on('open', () => this.emit('open'));
    this.port.on('error', (err) => this.emit('error', err));
    this.parser.on('data', (data) => this.emit('data', data));
  }

  /**
   * Close the serial port connection.
   * @returns {Promise<void>} A promise that resolves when the port is closed successfully.
   */
  close() {
    return new Promise((resolve, reject) => {
      this.port.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
} 

/**
 * Events emitted by BarcodeScanner:
 * - 'open': Emitted when the serial port connection is successfully established.
 * - 'error': Emitted when a serial port error occurs, with the error object as parameter.
 * - 'data': Emitted when barcode data is received, with the scanned data as parameter.
 */

export default BarcodeScanner;