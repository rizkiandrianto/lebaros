import NextImage from 'next/image';

export default function Image({ className, src, width, height, ...arg }) {
  if (arg && Object.keys(arg).length) console.log(arg)
  if (src.startsWith('data:image')) return <img src={src} width={width} className={className} {...arg} />
  return <NextImage src={src} width={width} height={height} className={className} key={src} {...arg} />
}

Image.defaultProps = {
  src: ''
}
