
const contracts = [
  "0x2F123cF3F37CE3328CC9B5b8415f9EC5109b45e7", // bC3M
  "0x2f11eeee0bf21e7661a22dbbbb9068f4ad191b86", // bNIU
  "0x0f76D32CDccDcbd602A55Af23EAF58FD1eE17245", // bERNA
  "0xbbcb0356bB9e6B3Faa5CbF9E5F36185d53403Ac9", // bCOIN
  "0xCA30c93B02514f86d5C86a6e375E3A330B435Fb5", // b1B01
  "0x52d134c6DB5889FaD3542A09eAf7Aa90C0fdf9E4", // bIBTA
  "0x1e2c4fb7ede391d116e6b41cd0608260e8801d59", // bCSPX
  "0x20C64dEE8FdA5269A78f2D5BDBa861CA1d83DF7a", // bHIGH
].map(i => i.toLowerCase())
							
async function tvl(_, _b, _cb, { api, }) {
  let tokens = [...contracts]
  if (api.chain === 'base') {
    tokens.push('0xC3cE78B037DDA1B966D31EC7979d3f3a38571A8E')
    tokens = tokens.filter(i => i !== '0x1e2c4fb7ede391d116e6b41cd0608260e8801d59')
  }
  const supply = await api.multiCall({ abi: 'erc20:totalSupply', calls: tokens })
  api.addTokens(tokens, supply)
  return api.getBalances()
}

const chains = ["ethereum", "polygon", 'xdai', 'bsc', "avax", "fantom", "base", "arbitrum"]

chains.forEach(chain => {
  module.exports[chain] = { tvl }
})