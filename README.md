# flu-ens
an approach for routing that checks a text record for a ed25519 peer id at the `fluence_project` (could be anything really) key value, and returns a greeting from that peer

## how to run

terminal #1
```
$ cd src/ts
// update Uint8Array for private key
$ pnpm i
$ PKEY=<random_number> ./node_modules/.bin/ts-node index.ts
connected router_peer_id
```

terminal #2
```
$ cd src/ts
// update Uint8Array for private key
$ PKEY=<random_number> ./node_modules/.bin/ts-node device.ts
connected device_peer_id
```

test
```
$ fluence run -f 'routeGreet("ens.eth","<router_peer_id>")' --relay=<relay_multi_addr>
```