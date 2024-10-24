import '@styles/tailwind.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Toaster } from 'react-hot-toast'
import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from '@components/common/ErrorBoundary'
import { wrapper } from '@dropgala/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import LoadingBar from '@components/common/loading-bar'
import OfflineNotice from '@components/OfflineNotice'
import { useApollo } from '@dropgala/query/graphql/client'
import StoreBuilderElementPosition from '@components/common/StoreBuilderElementPosition'
import { useIsInIframe } from '@dropgala/utils/hooks/useIsInIframe'

const Noop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

const App = ({ Component, ...rest }: AppProps) => {
  const { pageProps } = rest
  const Layout = (Component as any).Layout || Noop
  const { store, props } = wrapper.useWrappedStore(rest)
  const apolloClient = useApollo(pageProps.initialApolloState)
  const { isInIframe } = useIsInIframe()

  return (
    <ErrorBoundary>
      <StoreBuilderElementPosition />
      {isInIframe && (
        <style jsx global>{`
          html {
            button {
              pointer-events: none;
            }
            a {
              pointer-events: none;
            }
          }
        `}</style>
      )}
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Layout {...props}>
            <LoadingBar />
            <OfflineNotice />
            <Toaster
              containerStyle={{
                top: 160
              }}
            />
            <Component {...props} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
