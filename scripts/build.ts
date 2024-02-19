import { BunPlugin } from 'bun'
import { EntryPointConfig, generateDtsBundle } from 'dts-bundle-generator'
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
    format: 'esm',
    minify: true,
    sourcemap: 'inline',
    target: 'node',
    plugins: [
        dtsPlugin()
    ],
} )

console.log( 'Build: done' )

function dtsPlugin (): BunPlugin {
    const output: EntryPointConfig[ 'output' ] = { noBanner: true }
    return {
        name: 'my-plugin',
        target: 'node',
        setup ( build ) {
            const outDir = build.config.outdir || './dist'

            build.config.entrypoints
                .map( filePath => ( { filePath, output } ) )
                .forEach( config => {
                    const [ output ] = generateDtsBundle( [ config ] )
                    const dtsFileName = config.filePath
                        .replace( /^.*\//, '' )
                        .replace( /\.[jtm]s$/, '.d.ts' )
                    const outFile = Path.join( outDir, dtsFileName )
                    return Bun.write( outFile, output )
                } )
        },
    }
}