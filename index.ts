import * as dotenv from 'dotenv'
import { LogLevel, Nautilus } from '@deltadao/nautilus'
import { Network, NETWORK_CONFIGS, PRICING_CONFIGS } from './config'
import { Wallet, providers } from 'ethers'
import { access } from './access'
import { compute, getComputeStatus, retrieveComputeResult } from './compute'
import {
  publishAccessAlgorithm,
  publishAccessDataset,
  publishComputeAlgorithm,
  publishComputeDataset,
  publishSaaSOffer
} from './publish'
import {
  editAlgoMetadata,
  editServicePrice,
  editToSaas,
  editTrustedAlgorithms,
  revokeAsset
} from './edit'
dotenv.config()

// load config based on selected network
if (!process.env.NETWORK) {
  throw new Error(
    `Set your networn in the .env file. Supported networks are ${Object.values(
      Network
    ).join(', ')}.`
  )
}
const selectedEnvNetwork = process.env.NETWORK.toUpperCase()
if (!(selectedEnvNetwork in Network)) {
  throw new Error(
    `Invalid network selection: ${selectedEnvNetwork}. Supported networks are ${Object.values(
      Network
    ).join(', ')}.`
  )
}
console.log(`Your selected NETWORK is ${Network[selectedEnvNetwork]}`)
const networkConfig = NETWORK_CONFIGS[selectedEnvNetwork]
const pricingConfig = PRICING_CONFIGS[selectedEnvNetwork]

// Setting up ethers wallet
const privateKey = process.env.PRIVATE_KEY as string // make sure to setup your PRIVATE_KEY in .env file
const provider = new providers.JsonRpcProvider(networkConfig.nodeUri)
const wallet = new Wallet(privateKey, provider)

async function main() {
  Nautilus.setLogLevel(LogLevel.Verbose) // optional to show more nautilus internal logs
  const nautilus = await Nautilus.create(wallet, networkConfig)
  await access(nautilus, 'did:op:39b8ea3daed1e918d6a04befb122dd9d35a82457f3faa8b7e511eee80a895bbf')
}

main()
