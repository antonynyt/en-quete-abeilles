# Borne Backend

This is the backend for the Borne.  
It provides a REST API for bee data and a WebSocket endpoint for barcode scanning.

## Features

- **REST API**:  
  - `POST /api/bees` — Add a bee by name  
  - `GET /api/bees` — List all bees

- **WebSocket**:  
  - `GET /ws` — Receives barcode scans and validates codes

## Requirements

- Node.js (v18+ recommended)
- SQLite3

## Setup

```bash
npm install
npm run dev
```

The server will start at [http://localhost:3000](http://localhost:3000).

## API Usage

### Add a Bee

```http
POST /api/bees
Content-Type: application/json

{
  "name": "BeeName"
}
```

### List Bees

```http
GET /api/bees
```

### WebSocket Barcode Scanning

Connect to:  
`ws://localhost:3000/ws`

Receives messages like:

```json
{ "type": "beecode", "code": "<base64-code>" }
```

Invalid codes will return:

```json
{ "type": "invalid" }
```

## Development

- Edit source files in `src/`
- Database file is in `db/`
- WebSocket logic is in `src/ws/`