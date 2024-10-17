import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
    icon: any;
    url: string;
    className?: string;
}

export default function FontIcon({icon,url, className}: IconProps) {
  return (
    <div>
         <a href={url} className={className}>
              <FontAwesomeIcon icon={icon} />
            </a>
    </div>
  )
}

