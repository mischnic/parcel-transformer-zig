// @flow strict-local

const path = require("path");
const os = require("os");
const fs = require("fs");

const { Transformer } = require("@parcel/plugin");
const execa = require("execa");

let tmp = path.join(os.tmpdir(), "parcel-transformer-zig");
fs.mkdirSync(tmp, { recursive: true });

module.exports = (new Transformer({
	canReuseAST({ ast }) {
		return ast.type === "babel" && semver.satisfies(ast.version, "^7.0.0");
	},

	async transform({ asset }) {
		let input = asset.filePath;

		// TODO maybe use `zig build` instead?
		await execa(
			"zig",
			[
				"build-lib",
				asset.filePath,
				"-target",
				"wasm32-freestanding",
				"-dynamic",
				"--name",
				"out",
			],
			{
				cwd: tmp,
			}
		);

		// TODO I couldn't find a way to get a list of files
		// that are part of the build from the Zig compiler.
		// for(let f of zigIncludedFiles) {
		// 	asset.invalidateOnFileChange(f);
		// }

		asset.setBuffer(await fs.promises.readFile(path.join(tmp, "out.wasm")));
		asset.type = "wasm";
		return [asset];
	},
}) /*: Transformer */);
