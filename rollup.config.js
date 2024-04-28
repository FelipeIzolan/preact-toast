import fs from "fs";

import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

function del(list) {
  return {
    name: 'del',
    buildEnd() {
      list.forEach(x => fs.unlinkSync(x));
    }
  }
}

export default [
  {
	  input: 'src/index.tsx',
	  output: {
	    file: "dist/index.js",
	    name: "index",
	    format: "es",
	  },
	  external: ["preact"],
	  plugins: [
	    typescript(),
	    terser(),
	  ]
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts(),
      del(["./dist/css.d.ts", "./dist/core.d.ts", "./dist/types.d.ts"])
    ],
  }
];
