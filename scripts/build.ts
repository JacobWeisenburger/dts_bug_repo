import dts from 'bun-plugin-dts'
import { rm } from 'node:fs/promises'
import * as Path from 'node:path'

const root = Path.join( import.meta.dir, '..' )
const dist = Path.join( root, 'dist' )

await Promise.resolve()
    .then( () => console.log( 'Building...' ) )

    .then( async () => {
        await rm( dist, { recursive: true } )
            .then( () => console.log( 'dist: deleted' ) )
    } )

    .then( async () => {
        await Bun.build( {
            entrypoints: [ './src/index.ts' ],
            // format: 'esm',
            // minify: true,
            // sourcemap: 'inline',
            // target: 'node',
            plugins: [
                dts()
            ],
        } )
    } )

    .then( () => console.log( 'Build: done' ) )