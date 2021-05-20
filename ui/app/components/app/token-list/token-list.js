import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

import TokenCell from '../token-cell'
import { useI18nContext } from '../../../hooks/useI18nContext'
import { useTokenTracker } from '../../../hooks/useTokenTracker'
import { useSelector } from 'react-redux'
import { getAssetImages, getCurrentNetworkId } from '../../../selectors'
import { getTokens } from '../../../ducks/metamask/metamask'

const networkAddressChecker = {
  "42220": "0x471ece3750da237f93b8e339c536989b8978a438",
  "44787": "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
  "62320": "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"
}

export default function TokenList({ onTokenClick }) {
  const t = useI18nContext()
  const assetImages = useSelector(getAssetImages)
  // use `isEqual` comparison function because the token array is serialized
  // from the background so it has a new reference with each background update,
  // even if the tokens haven't changed
  const tokens = useSelector(getTokens, isEqual)
  const networkId = useSelector(getCurrentNetworkId)
  const { loading, error, tokensWithBalances } = useTokenTracker(tokens)

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '250px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        {t('loadingTokens')}
      </div>
    )
  }

  return (
    <div>
      {tokensWithBalances.filter(tokenData => networkAddressChecker[networkId].toLowerCase() !== tokenData.address.toLowerCase()).map((tokenData, index) => {
        tokenData.image = assetImages[tokenData.address]
        return (
          <TokenCell
            key={index}
            {...tokenData}
            outdatedBalance={Boolean(error)}
            onClick={onTokenClick}
          />
        )
      })}
    </div>
  )
}

TokenList.propTypes = {
  onTokenClick: PropTypes.func.isRequired,
}
