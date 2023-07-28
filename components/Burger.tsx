import React from 'react'
import { Edit, MoreVert, ShoppingCart } from '@mui/icons-material'
import { IconButton, ListDivider, ListItemDecorator, Menu, MenuItem } from '@mui/joy'
import Dialog from '@/components/Dialog'

type BurgerProps = {
  menuItems: [
    {
      icon: React.ReactNode
      text: string
      action: () => void
    },
  ]
}

const Burger = (props: BurgerProps) => {
  const buttonRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <IconButton
        ref={buttonRef}
        id="positioned-demo-button"
        aria-controls={'positioned-demo-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="positioned-demo-menu"
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        {props.menuItems.map((m) => (
          <MenuItem
            key={m.text}
            onClick={() => {
              m.action()
              setOpen(false)
            }}
          >
            <ListItemDecorator>{m.icon}</ListItemDecorator> {m.text}
          </MenuItem>
        ))}
        <ListDivider />
        <MenuItem onClick={handleClose} variant="soft" color="success">
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <ShoppingCart />
          </ListItemDecorator>{' '}
          Create shopping list
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Burger
