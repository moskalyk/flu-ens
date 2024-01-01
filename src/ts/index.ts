import dotenv from 'dotenv'

dotenv.config()

import {registerENSService} from './main.js'
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
      Number(process!.env!.PKEY),  ...
    ])}});

    console.log('connected ',(await Fluence.getClient().getPeerId()))

    registerENSService({
      route: async (ens: any) => {
          const batchData: any = await client.ensBatch(getTextRecord.batch({ name: ens, key: 'fluence_project' }),)
          return batchData[0] != null ? batchData[0] : "12D3KooWBg7rzv8a9V87WP7Z36CFGhh6iymaBQkKDaiK9oMi7QTr" 
      }
    })
})()