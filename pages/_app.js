import React from 'react'

import '../styles/index.css'
import { SearchProvider } from 'components/jobs/SearchFilter';

function MyApp({ Component, pageProps }) {
  return (

      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
  )
}

export default MyApp
