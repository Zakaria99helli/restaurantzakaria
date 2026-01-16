import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig(async () => {
  const plugins = [
    react(),
    metaImagesPlugin(),
  ];

  return {
    plugins,
    root: process.cwd(),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },
    server: {
      middlewareMode: true,
      // السماح بجميع الروابط المحتملة من Manus
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        ".manus.computer",
        ".us2.manus.computer",
        "46409-i3atsxqtfk8xok8yy51eu-9d979ecf.us2.manus.computer",
      ],
    },
  };
});
