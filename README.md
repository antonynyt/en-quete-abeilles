# En Quête d'Abeilles

A bee-themed quest application consisting of a web application, interactive kiosk system, and content management backend.

## Project Structure

This project consists of three main components:

### `/webapp`
The frontend web application that provides the user interface for the main experience. Built with Vue.js and Vite.

### `/strapi`
The backend Content Management System (CMS) built with Strapi.
You can use `https://cms.cca-abeille.ch` if you don't want to install Strapi and setup some mock data.

### `/borne`
An interactive kiosk system with barcode scanning capabilities, designed for Raspberry Pi deployment. Includes:
- **Backend**: Node.js REST API and WebSocket server for barcode scanning
- **Frontend**: Kiosk interface
- **App Wrapper**: Electron-based wrapper for full-screen kiosk mode

## Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Docker (for borne deployment)
- Raspberry Pi (for production borne setup)

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd en-quete-abeilles
   ```

2. **Set up Strapi CMS:**
   ```bash
   cd strapi
   npm install
   cp .env.example .env
   # Configure your .env file
   npm run develop
   ```

You can generate random keys using Node.js in a terminal `require('crypto').randomBytes(16).toString('base64')`

3. **Set up Web Application:**
   ```bash
   cd webapp
   npm install
   cp .env.example .env
   # Configure your .env file with Strapi URL
   npm run dev
   ```

4. **Set up Borne (Development):**
   ```bash
   # Backend
   cd borne/backend
   npm install
   # Configure SERIAL_PORT in .env (see .env.example)
   npm run dev

   # Frontend (separate terminal)
   cd borne/frontend
   npm install
   npm run dev

   # App Wrapper (don't run it)
   cd borne/app-wrapper
   npm install
   ```

## Components Overview

### Web Application (`/webapp`)
- Vue.js-based quest game

### Borne Kiosk System (`/borne`)
- **Interactive Kiosk**: Touch-screen interface for public installations
- **Barcode Scanner**: Waveshare 1D/2D Scanner Module (C) integration
- **WebSocket Communication**: Real-time barcode validation
- **Electron Wrapper**: Full-screen kiosk mode with auto-startup
- **Docker Support**: Containerized deployment for Raspberry Pi

### Content Management (`/strapi`)

## Deployment

### Borne (Raspberry Pi)
```bash
cd borne
# Configure environment variables
make start  # Start with Docker Compose
make install-service  # Install systemd service for auto-startup
```

### Web Application
```bash
cd webapp
npm run build
# Deploy build files to your web server
```

### Strapi CMS
```bash
cd strapi
npm run build
npm run start
# Configure for production deployment
```

## Configuration

### Environment Variables

**Strapi** (`.env`):
- Database configuration
- JWT secrets
- Admin panel settings

**Webapp** (`.env`):
- `VITE_STRAPI_URL`: URL to your Strapi API

**Borne Backend** (`.env`):
- `SERIAL_PORT`: Path to barcode scanner device (e.g., `/dev/ttyUSB0`)

## Troubleshooting

### Barcode Scanner Issues
See detailed configuration guide in [`borne/backend/scanner/README.md`](borne/backend/scanner/README.md)

### Docker Serial Device Access
- **Linux only**: Docker serial device passthrough only works on Linux systems
- For development on macOS/Windows, configure direct serial port access

### Common Issues
- Ensure all `.env` files are properly configured
- Check serial device permissions on Linux (`sudo usermod -a -G dialout $USER`)
- Verify Strapi API connectivity for webapp

## Documentation

- [Borne System Setup](borne/README.md)
- [Borne Backend API](borne/backend/README.md)
- [Scanner Configuration](borne/backend/scanner/README.md)
- [App Wrapper Setup](borne/app-wrapper/README.md)
- [Strapi Documentation](strapi/README.md)