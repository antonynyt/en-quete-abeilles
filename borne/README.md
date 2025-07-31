# BeeQuest Borne

## Platform Requirements

-   **Dockerized backend with serialport access only works on Linux.**
    -   This is due to Docker Desktop on macOS/Windows not supporting direct serial device passthrough.
    -   For Raspberry Pi or other Linux systems, serial devices can be mapped into containers.

---

## Development

To run the backend and frontend in development mode (without Docker):

1. Change the SERIAL_PORT .env in the backend (look at .env.example)

-   **Important:** For scanner setup and configuration, see the documentation in  
    [backend/scanner/README.md](backend/scanner/README.md)

2. **Install npm dependancies in directories:**
    ```sh
    cd backend
    npm install
    ```
    In a separate terminal:
    ```sh
    cd frontend
    npm install
    ```
    In a separate terminal:
    ```sh
    cd app-wrapper
    npm install
    ```

-   **Important:** For app-wrapper setup and configuration, see the documentation in  
    [app-wrapper/README.md](app-wrapper/README.md)

---

## Installation (Linux/Raspberry Pi)

1. **Clone the repository:**

    ```sh
    git clone <repo-url>
    cd borne
    ```

2. **Configure environment variables:**

    - Create a `.env` file in `frontend/` with the following content:
        ```
        VITE_STRAPI_URL=<your-strapi-api-url>
        ```
    - This is required for the frontend to communicate with the Strapi API.

3. **Manual control with Make:**
    - To start docker compose plus the kiosk displays:
        ```sh
        make start
        ```
    - To update (pull latest images and restart) :
        ```sh
        make update
        ```
    - To wipe borne storage :
        ```sh
        make wipe
        ```

## Manual Installation Shortcuts

You can use the provided Makefile to install the desktop shortcut and systemd service:

-   **Install desktop shortcut:**

    ```sh
    make install-app
    ```

-   **Install and start the systemd service:**

    ```sh
    make install-service
    ```

-   **Stop the systemd service:**

    ```sh
    make stop-service
    ```

-   **Map the touchscreen display:**
    ```sh
    make map-touchscreen
    # you can also make it permanent:
    make install-map-touchscreen
    ```

---

## Automatic Startup on Raspberry Pi

A systemd service is provided to automatically start the application after Docker is ready at `/backend/bin/systemd/beequest.service`

1. **Edit the `beequest.service` paths if required.**
2. **Enable and start the service:**
    ```sh
    sudo systemctl daemon-reload
    sudo systemctl enable beequest
    sudo systemctl start beequest
    ```

---

## Notes

-   The backend expects a serial device to be available and mapped (see `compose.yaml`).
-   The frontend requires a `.env` file with the Strapi API URL.
-   On non-Linux systems, serial device passthrough will **not** work in docker
