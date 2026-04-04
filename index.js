import http from "http";
import app from "./src/config/express.config.js";

(() => {
  const httpServer = http.createServer(app);

  //*port

  const PORT = 9005;
  const HOST = "localhost";

  httpServer.listen(PORT, HOST, () => {
    console.log(`URL: http://${HOST}:${PORT}`);
    console.log("Server is running on port" + PORT);
    console.log("Press CTRL + C to disconnect server...");
  });
})();
