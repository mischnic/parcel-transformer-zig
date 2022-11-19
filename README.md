# PoC: a Parcel plugin to compile Zig to Wasm

See the example folder for an example.

Potential problems to solve for a proper plugin:

-   `build.zig` should probably be respected
-   Somehow, Parcel needs to know which files influence the Zig build output (apart from the entry Zig file itself), so Zig-to-Zig imports, `build.zig`, .... These files should be passed to `asset.invalidateOnFile(Change|Create)`.
