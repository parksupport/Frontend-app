import React from 'react'

interface NavLinkComponentProps {
    url?: string
    name: string
    className?: string
    onClick?: () => void
}

export default function NavLinkComponent({url,name,className,onClick}: NavLinkComponentProps) {
  return (
    <div onClick={onClick}>
          <a href={url} className={className}>
              {name}
            </a>
    </div>
  )
}
