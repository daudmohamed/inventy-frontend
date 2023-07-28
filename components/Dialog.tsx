import React from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalClose, Sheet } from '@mui/joy'
import Typography from '@mui/joy/Typography'

const Dialog = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dialogRef = React.useRef(null)

  const [item, setItem] = React.useState({
    name: '',
    current: 0,
    target: 0,
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('http://localhost:8080/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data)
        setOpen(false)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      ref={dialogRef}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="soft"
        anchorEl={dialogRef.current}
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose
          variant="soft"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Add new item
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              // html input attribute
              name="name"
              type="text"
              placeholder="Enter name of item"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>current</FormLabel>
            <Input
              // html input attribute
              name="current"
              type="number"
              placeholder="Enter current amount"
              value={item.current}
              onChange={(e) => setItem({ ...item, current: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>target</FormLabel>
            <Input
              // html input attribute
              name="target"
              type="number"
              placeholder="Enter target amount"
              value={item.target}
              onChange={(e) => setItem({ ...item, target: e.target.value })}
            />
          </FormControl>
          <Button className="mt-1" type="submit">
            submit
          </Button>
        </form>
      </Sheet>
    </Modal>
  )
}

export default Dialog