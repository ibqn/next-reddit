import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit</title>
        <meta name="description" content="Reddit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-teal-200 h-screen">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>

      <footer className=""></footer>
    </>
  )
}
