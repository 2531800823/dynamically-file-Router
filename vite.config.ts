import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

function filesPlugin() {
  return {
    name: "vite-plugin-files",
    configureServer(server) {
      server.middlewares.use("/api/files", (req, res) => {
        const directoryPath = path.join(__dirname, "./src/pages/"); // 修改为你的文件夹路径
        fs.readdir(directoryPath, (err, files) => {
          if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Unable to scan directory" }));
            return;
          }
          res.end(JSON.stringify(files));
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), filesPlugin()],
});
