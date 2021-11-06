import { ConbiniItem } from '../../scraper/types'

type Props = {
  items: ConbiniItem[]
}

export default function ConbiniList({ items }: Props) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href}>
          <p>href: {item.href}</p>
          <p>title: {item.title}</p>
          <p>category: {item.category}</p>
          <p>price: {item.price}</p>
          <img src={item.imgUrl} />
        </li>
      ))}
    </ul>
  )
}