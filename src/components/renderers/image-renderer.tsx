import Image from 'next/image'

type Props = {
  data: {
    file: {
      url: string
    }
  }
}

export const ImageRenderer = ({ data: { file } }: Props) => {
  const { url } = file

  return (
    <div className="relative min-h-[15rem] w-full">
      <Image alt="image" className="object-contain" fill src={url} />
    </div>
  )
}
