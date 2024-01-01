import dotenv from 'dotenv'

dotenv.config()

import {registerERC721Service} from './main.js'
import {Fluence, kras} from '@fluencelabs/js-client'

import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { createEnsPublicClient } from '@ensdomains/ensjs'
import { getTextRecord } from'@ensdomains/ensjs/public'

const client = createEnsPublicClient({
  chain: mainnet,
  transport: http(),
})

;(async () => {
    await Fluence.connect(kras[2], {debug: {printParticleId: true}, keyPair: {type: 'Ed25519', source: new Uint8Array([
      Number(process!.env!.PKEY), ...
    ])}});

    console.log('connected ',(await Fluence.getClient().getPeerId()))

    registerERC721Service({
      greet: async (ens: any) => {
          return 'howdy'
      }
    })
})()