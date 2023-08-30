import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  Sheet,
} from '@mui/joy'
import Typography from '@mui/joy/Typography'
import { addItem } from '@/app/api/apis'
import { UploadFile } from '@mui/icons-material'

const Dialog = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [item, setItem] = React.useState<ItemDTO>({
    name: '',
    current: 0,
    target: 0,
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addItem(item)
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
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet className="rounded shadow-2xl p-8">
        <ModalClose
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
          <Sheet className="flex gap-2">
            <Sheet variant="soft" className="rounded w-32 flex justify-center items-center">
              <FormControl>
                <FormLabel>Upload</FormLabel>
                <IconButton variant="soft" className="flex justify-center">
                  <UploadFile />
                </IconButton>
              </FormControl>
            </Sheet>
            <Sheet className="flex flex-col gap-1">
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
                  onChange={(e) => setItem({ ...item, current: Number.parseInt(e.target.value) })}
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
                  onChange={(e) => setItem({ ...item, target: Number.parseInt(e.target.value) })}
                />
              </FormControl>
              <Button color="success" className="mt-1" type="submit">
                submit
              </Button>
            </Sheet>
          </Sheet>
        </form>
      </Sheet>
    </Modal>
  )
}

export default Dialog
