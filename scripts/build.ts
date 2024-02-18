import dts from 'bun-plugin-dts'
import { rm } from 'node:fs/promises'
import * as Path from 'node:path'

console.log( 'Building...' )

await rm(
    Path.join( import.meta.dir, '..', 'dist' ),
    { recursive: true }
)
console.log( 'dist: deleted' )

await Bun.build( {
    entrypoints: [ './src/index.ts' ],
    outdir: './dist',
    plugins: [
        dts()
    ],
} )

console.log( 'Build: done' )