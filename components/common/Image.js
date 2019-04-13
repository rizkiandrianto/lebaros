export default function Image({ className, src, width }) {
  return <img src={src} width={width} className={className} />
}

Image.defaultProps = {
  src: '',
  width: 24
}
