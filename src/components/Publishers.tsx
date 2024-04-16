export function Publishers({ id, url, name }) {
  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name[0].name}
      </a>
    </div>
  )
}
