export default function getAccountLink (address, network, rpcPrefs) {
  if (rpcPrefs && rpcPrefs.blockExplorerUrl) {
    return `${rpcPrefs.blockExplorerUrl.replace(/\/+$/, '')}/address/${address}`
  }

  const net = parseInt(network)
  let link
  switch (net) {
    case 42220: // main net
      link = `https://explorer.celo.org/mainnet/address/${address}`
      break
    case 44787: // alfajores test net
      link = `https://explorer.celo.org/alfajores/address/${address}`
      break
    case 62320: // baklava test net
      link = `https://explorer.celo.org/baklava/address/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
