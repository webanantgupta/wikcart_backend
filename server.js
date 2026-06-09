const app = require("./app");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;

let qrCodeData = "";
let clientInstance = null;

const startWhatsApp = () => {
    if (clientInstance) return;

    clientInstance = new Client({
        authStrategy: new LocalAuth(),
        webVersionCache: {
            type: 'remote',
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        },
        puppeteer: {
            headless: process.env.NODE_ENV === 'production' ? true : false,
            handleSIGINT: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
            ],
        }
    });

    clientInstance.on("qr", async (qr) => {
        console.log("QR RECEIVED");
        qrCodeData = await qrcode.toDataURL(qr);
    });

    clientInstance.on("ready", () => {
        console.log("WhatsApp is ready! ✅");
        qrCodeData = "CONNECTED"; 
    });

    clientInstance.on("disconnected", () => {
        console.log("WhatsApp Disconnected");
        qrCodeData = "";
        clientInstance = null;
    });

    clientInstance.initialize().catch(err => {
        console.error("Auth initialization error:", err);
        clientInstance = null;
    });
};

app.get("/api/whatsapp/login", (req, res) => {
    startWhatsApp();
    res.json({ message: "Initializing WhatsApp..." });
});

app.get("/qr", (req, res) => {
    res.json({ qr: qrCodeData });
});

/**
 * IMPROVED LOGOUT ROUTE
 * Handles "Detached Frame" errors gracefully
 */
app.get("/api/whatsapp/logout", async (req, res) => {
    console.log("Logout request received...");
    
    if (!clientInstance) {
        return res.status(400).json({ message: "No active session to log out" });
    }

    try {
        // 1. Try to log out officially (This might fail if browser crashed)
        try {
            await clientInstance.logout();
            console.log("WhatsApp logout successful.");
        } catch (logoutError) {
            console.warn("Could not call logout() - frame likely detached. Proceeding to destroy...");
        }

        // 2. Kill the Puppeteer process/browser instance
        await clientInstance.destroy();
        console.log("Browser instance destroyed.");

    } catch (error) {
        console.error("Logout Error during cleanup:", error);
    } finally {
        // 3. ALWAYS reset local state so user can try again
        clientInstance = null;
        qrCodeData = "";
        
        res.json({ message: "Logged out and session cleared" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});