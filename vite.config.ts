import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 200,
      minify: mode === "production",
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
        },
      },
    },
    resolve: {
      alias: {
        // for TypeScript path alias import like : @/x/y/z
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://reqres.in/api",
          secure: false,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
