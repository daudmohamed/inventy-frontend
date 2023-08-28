import { Avatar, Sheet, Tooltip } from '@mui/joy'
import React from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client'

type HeaderProps = {
  user?: UserProfile
} & React.HTMLAttributes<HTMLHeadingElement>

const Header = (props: HeaderProps) => {
  const { user } = props
  const pic = user && user.picture ? user.picture : undefined
  const alt = user && user.name ? user.name : undefined
  let avatar
  if (user) {
    avatar = (
      <>
        <Tooltip title="Log out">
          <a href="/api/auth/logout">
            <Avatar src={pic} alt={alt} color="primary" variant="soft" />
          </a>
        </Tooltip>
      </>
    )
  } else {
    avatar = (
      <>
        <Tooltip title="Log in">
          <Avatar color="primary" variant="soft" />
        </Tooltip>
      </>
    )
  }

  return (
    <Sheet className="flex justify-between p-2">
      {avatar}
      {props.children}
    </Sheet>
  )
}

export default Header
