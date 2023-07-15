import axios from 'axios'

function prefixURL(string: string): string {
  let url
  try {
    url = new URL(string)

    if (!url.hostname) {
      url = new URL('https://' + string)
    }
  } catch (error) {
    url = new URL('https://' + string)
  }

  return url.href
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const href = url.searchParams.get('url')

  if (!href) {
    return new Response('Invalid href', { status: 400 })
  }

  const res = await axios.get(prefixURL(href))

  // Parse the HTML using regular expressions
  const titleMatch = res.data.match(/<title>(.*?)<\/title>/)
  const title = titleMatch ? titleMatch[1] : ''

  const descriptionMatch = res.data.match(/<meta name="description" content="(.*?)"/)
  const description = descriptionMatch ? descriptionMatch[1] : ''

  const imageMatch = res.data.match(/<meta property="og:image" content="(.*?)"/)
  const imageUrl = imageMatch ? imageMatch[1] : ''

  // Return the data in the format required by the editor tool
  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    })
  )
}
