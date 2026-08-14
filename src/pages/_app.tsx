import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Container, Header } from '@/styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (

    <Container>
      <Header>
        <strong>GLPAR Shop</strong>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
