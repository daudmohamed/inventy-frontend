import React, { useEffect } from 'react'
import { Button, Checkbox, IconButton, Sheet, Table, Tooltip } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/joy/Typography'
import Dialog from '@/components/Dialog'
import Burger from '@/components/Burger'
import { Delete, Edit } from '@mui/icons-material'
import { fetchItems } from '@/api/apis'

type Item = {
  id: number
  name: string
  current: number
  target: number
}

type ListProps = {
  type?: 'inventory' | 'shopping'
} & React.HTMLAttributes<HTMLDivElement>

const List = (props: ListProps) => {
  const [items, setItems] = React.useState<Item[]>([])
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  useEffect(() => {
    fetchItems(props.type).then((data) => {
      setItems(data)
    })
  }, [openModal, props.type])

  return (
    <Sheet className="flex w-full flex-col">
      <Sheet className="flex justify-between items-center p-2">
        <Typography level="h6" className="flex-1" id="tableTitle" component="div">
          {props.type === 'inventory' ? 'Inventory' : 'Shopping List'}
        </Typography>
        <Dialog open={openModal} setOpen={setOpenModal} />

        <Burger
          menuItems={[
            {
              icon: <Edit />,
              text: 'Add item',
              action: () => setOpenModal(!openModal),
            },
          ]}
        />
      </Sheet>
      <Table borderAxis="x" size="lg" stickyFooter stickyHeader hoverRow>
        <thead>
          <tr key="list-header">
            <th className="w-[3rem]">
              <Tooltip title="Check all">
                <Checkbox size="md" variant="soft" />
              </Tooltip>
            </th>
            <th className="w-2/5">Name</th>
            <th>current</th>
            <th>target</th>
            <th aria-label="last" className="w-[3rem] bg-transparent" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <Checkbox size="md" variant="soft" />
              </td>
              <td scope="row">{item.name}</td>
              <td>{item.current}</td>
              <td>{item.target}</td>
              <td>
                <Sheet className="flex justify-center">
                  <IconButton
                    size="sm"
                    variant="soft"
                    color="danger"
                    onClick={() => console.log('Delete item:', item.id)}
                  >
                    <Delete />
                  </IconButton>
                </Sheet>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  )
}

export default List
