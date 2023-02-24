# Meem NPM packages

# Local installation

From meem-packages:

1. `yarn`
2. `yarn bootstrap`
3. `yarn link` from inside packages/sdk
4. `yarn link` from inside each package you intend to edit (e.g. packages/react)

From meem-app

1. `yarn localPackageLink`
2. When done editing, revert to the live NPM packages with `yarn localPackageUnlink`

For working inside meem-packages open the meem-packages.code-workspace file:
`code meem-packages.code-workspace`

To auto-build changes to meem-packages run from the root directory:
`yarn watch`

# Performance issues

Note: Running these packages locally will cause page loads to be much slower.
