import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit</title>
        <meta name="description" content="Reddit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen bg-teal-200">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>

      <footer className=""></footer>
    </>
  )
}
