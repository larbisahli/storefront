import '@styles/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from '@components/common/ErrorBoundary'
import { store } from '@dropgala/store'
import apolloClient from '@lib/apollo-client'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'

const Noop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default appWithTranslation(App)
