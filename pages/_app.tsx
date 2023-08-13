import { AppProvider } from '../services/context'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <AppProvider>
  <Component {...pageProps} />
</AppProvider>


}

export default MyApp
