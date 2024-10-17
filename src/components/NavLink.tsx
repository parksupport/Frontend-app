import React from 'react'

interface NavLinkComponentProps {
    url: string
    name: string
    className?: string
}

export default function NavLinkComponent({url,name,className}: NavLinkComponentProps) {
  return (
    <div>
          <a href={url} className={className}>
              {name}
            </a>
    </div>
  )
}
