import '@styles/tailwind.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from '@components/common/ErrorBoundary'
import { wrapper } from '@dropgala/store'
import apolloClient from '@lib/apollo-client'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

const Noop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

const App = ({ Component, ...rest }: AppProps) => {
  const Layout = (Component as any).Layout || Noop

  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
