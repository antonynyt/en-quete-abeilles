// config/plugins.ts
import type { Config as QRCodeConfig } from "strapi-plugin-qr-code/dist/server/src/config";

export default () => ({
    "qr-code": {
        enabled: true,
        config: {
            contentTypes: [
                {
                    uid: "api::task.task",
                    computeValue: (uid, status, document) => {
                        return `/t/${document.documentId}`;
                    },
                },
            ],
        } satisfies QRCodeConfig,
    },
});
