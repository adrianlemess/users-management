import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [react(), splitVendorChunkPlugin()],

    build: {
      chunkSizeWarningLimit: 200,
      minify: mode === "production",
      rollupOptions: {
        output: {
          manualChunks(id) {
            // If we split anything related with emotion or chakra-ui separately it will throw an error in the prod build
            if (
              id.includes("chakra-ui") ||
              id.includes("framer-motion") ||
              id.includes("emotion")
            ) {
              return "vendor";
            } else if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
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
  });
};
