# Borne Wrapper

## Installation

1. **Install dependencies**  
   Run the following command in the `app-wrapper` directory:
    ```sh
    npm install
    ```
2. **Start the application (development mode)**

    ```sh
    npm start
    ```

3. **Build for Linux (must be built on the PI)**
    ```sh
    npm run build -- --linux
    # or
    npx electron-builder --linux dir
    ```

The compiled and packaged application should be stored in:
`app-wrapper/dist/borne-wrapper/borne-wrapper`

-   **Note:** to kill the process on the pi use SSH (so maybe lookup for ifconfig before) and then `pkill borne`.