# Meem Market

A place to buy, sell, and auction [Meems](https://meem.wtf).

**These contracts are in an alpha state, have not been audited, and may contain critical security flaws resulting in lost funds. Use at your own risk.**

## Development

By default all commands will use the local network. For other networks use the ```--network <network_name>``` flag. See the hardhat.config.ts file for network names.

### Set up your .env

Copy the `.env.example` file to .env

### Install dependencies

```yarn```

### Watch and compile files automatically

```yarn watch```

### Run tests

```yarn test```

## Smart Contract Interaction

> **Change the network**
>
> For (deploy, upgrade, console, etc.) commands, you can change the network with `--network <network name>`
>
> The local network is used by default.

### Deploy contract

**You should only do this the first time. After that you should use upgrade to keep the same address**

`yarn deploy`

### Upgrade scripts

Upgrade individual facets

`yarn upgradeFacet --proxy <DiamondProxyAddress> --facet <FacetName>`

For example:

`yarn upgradeFacet --proxy 0x26291175Fa0Ea3C8583fEdEB56805eA68289b105 --facet AccessControlFacet`

## Console Interaction

This will open a hardhat console where you can interact directly with the smart contract

```yarn console```

### Get a meem instance for use in hardhat console

```
const auctionHouse = await (await ethers.getContractFactory('AuctionHouseFacet')).attach('<DiamondProxyAddress>')
```

## Credits

* Inspired by and adapted from [https://github.com/ourzora/auction-house](https://github.com/ourzora/auction-house)
