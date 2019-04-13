export default function Image({ src, width }) {
  return <img src={src} width={width} />
}

Image.defaultProps = {
  src: '',
  width: 24
}
