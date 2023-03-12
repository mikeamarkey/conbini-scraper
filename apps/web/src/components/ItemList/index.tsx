import Image from 'next/image'
import { type ComponentProps, useState } from 'react'
import { type ConbiniName, conbinisMap } from '~/core'
import { ConbiniLogo, Link } from 'components'
import { formatCurrency } from 'utils/number'

export type ItemListProps = {
  conbiniFilter?: ConbiniName
  itemCount: number
  items: {
    conbiniName: ConbiniName
    id: number
    img: string
    price: number
    title: string
    url: string
  }[]
}

function getItemCountText(
  filteredItemsCount: number,
  itemCount: number,
  conbiniFilter?: ConbiniName
): string {
  if (itemCount === 0) {
    return 'No new items this week... check back soon!'
  }

  if (filteredItemsCount === 0) {
    return `Couldn't find anything...`
  }

  if (filteredItemsCount === itemCount) {
    return 'Currently showing all items'
  }

  if (!conbiniFilter) {
    return `Currently showing ${filteredItemsCount} of ${itemCount} items`
  }

  return `Currently showing ${filteredItemsCount} items from ${conbinisMap[conbiniFilter].displayName}`
}

const ImageWithFallback = ({
  src: originalSrc,
  alt,
  ...props
}: ComponentProps<typeof Image>) => {
  const [src, setSrc] = useState(originalSrc)

  return (
    <Image
      {...props}
      onError={() => setSrc('/not-found.jpg')}
      alt={alt}
      src={src}
    />
  )
}

export default function ItemList({
  conbiniFilter,
  items,
  itemCount,
}: ItemListProps) {
  const itemCountText = getItemCountText(items.length, itemCount, conbiniFilter)

  return (
    <>
      <p className="text-center">{itemCountText}</p>

      {items.length > 0 && (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 mx-auto max-w-screen-xl">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              target="__blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col w-full h-full rounded-2xl border border-slate-300 cursor-pointer overflow-hidden">
                <div className="relative aspect-6/5">
                  <ImageWithFallback
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                </div>
                <p className="flex flex-col flex-grow pt-5 px-3 pb-2 font-bold">
                  {item.title}
                </p>
                <div className="flex items-center justify-between pt-2 px-3 pb-3">
                  <p className="font-bold">{formatCurrency(item.price)}</p>

                  <div className="overflow-hidden rounded-full">
                    <ConbiniLogo size={24} conbiniName={item.conbiniName} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
