import { Container } from '@nextui-org/react'
import { type GetStaticProps } from 'next'
import Head from 'next/head'
import { Client } from '~/db'
import { Box, Content, Footer, Header } from 'components'
import { type ContentProps } from 'components/Content'
import { apiUrl, publicKey } from 'constant'
import { resolveItems } from 'resolvers/item'

export type HomeProps = {
  items: ContentProps['items']
}

export function Home({ items }: HomeProps) {
  return (
    <>
      <Head>
        <title>Conbini This Week</title>
      </Head>

      <Container
        fluid
        css={{
          padding: '$xl $xs',
          '@xs': {
            // reset to default padding
            padding: '$xl calc(2 * $sm)',
          },
        }}
      >
        <Header itemCount={items.length} />
        <Box css={{ marginTop: '$xl', paddingBottom: '$md' }}>
          <Content items={items} />
        </Box>
        <Box
          css={{
            marginTop: '$sm',
            padding: '$xl $sm $md',
            borderTop: '1px solid $border',
          }}
        >
          <Footer />
        </Box>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const client = new Client(apiUrl, publicKey)
  const items = await client.getItems()
  const resolvedItems = resolveItems(items)

  return {
    props: { items: resolvedItems },
    revalidate: 360,
  }
}

export default Home
