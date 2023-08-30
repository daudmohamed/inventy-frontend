'use client'
import React from 'react'
import {
  Avatar,
  Button,
  CircularProgress,
  CssVarsProvider,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
  useColorScheme,
} from '@mui/joy'
import Header from '@/components/header'
import List from '@/components/List'
import { useUser } from '@auth0/nextjs-auth0/client'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

export default function Home() {
  const { user, error, isLoading } = useUser()
  let page
  if (isLoading) {
    page = (
      <Sheet className="flex justify-center items-center h-full">
        <CircularProgress />
      </Sheet>
    )
  } else if (error) {
    page = (
      <Sheet className="flex justify-center items-center">
        <p className="flex-1">Error</p>
      </Sheet>
    )
  } else if (!user) {
    page = (
      <Sheet className="flex justify-center items-center">
        <a href="/api/auth/login">
          <Button variant="soft" color="primary">
            Log in
          </Button>
        </a>
      </Sheet>
    )
  } else {
    page = (
      <>
        <Tabs size="lg">
          <TabList variant="soft" color="primary">
            <Tab>Inventory</Tab>
            <Tab>Shopping List</Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 2 }}>
            <List type="inventory" />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 2 }}>
            <List type="shopping" />
          </TabPanel>
        </Tabs>
      </>
    )
  }
  return (
    <main>
      <CssVarsProvider>
        <Header user={user}>
          <ModeToggle />
        </Header>
        {page}
      </CssVarsProvider>
    </main>
  )
}
