export default function getAccountLink (address, network, rpcPrefs) {
  if (rpcPrefs && rpcPrefs.blockExplorerUrl) {
    return `${rpcPrefs.blockExplorerUrl.replace(/\/+$/, '')}/address/${address}`
  }

  const net = parseInt(network)
  let link
  switch (net) {
    case 42220: // main net
      link = `https://explorer.celo.org/address/${address}`
      break
    case 44787: // morden test net
      link = `https://alfajores-blockscout.celo-testnet.org/address/${address}`
      break
    case 62320: // morden test net
      link = `https://baklava-blockscout.celo-testnet.org/address/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
