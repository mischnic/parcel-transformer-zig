import wasm from "url:./math.zig";

const source = fetch(wasm);

WebAssembly.instantiateStreaming(source).then((result) => {
  const add = result.instance.exports.add;
  document.body.innerText = `Zig says 1+2 = ${add(1, 2)}`;
});
