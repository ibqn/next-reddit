import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-[80vh] w-full grow items-center justify-center">
      <div>
        <h2 className="mb-4 text-3xl font-bold">Page not Found</h2>
        <p className="mb-2">Could not find requested resource</p>
        <p className="mb-2">
          View <Link href="/">all feeds</Link>
        </p>
      </div>
    </div>
  )
}
