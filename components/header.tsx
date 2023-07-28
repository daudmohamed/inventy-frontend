import { Avatar, Sheet } from '@mui/joy'
import React from 'react'

type HeaderProps = {} & React.HTMLAttributes<HTMLHeadingElement>

const Header = (props: HeaderProps) => {
  return (
    <Sheet className="flex justify-between p-2">
      <Avatar color="primary" variant="soft" />
      {props.children}
    </Sheet>
  )
}

export default Header
