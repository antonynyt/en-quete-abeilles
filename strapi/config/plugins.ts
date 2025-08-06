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
                        return `https://app.cca-abeille.ch/t/${document.documentId}`;
                    },
                },
            ],
        } satisfies QRCodeConfig,
    },
});
