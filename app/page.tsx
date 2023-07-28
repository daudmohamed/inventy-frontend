'use client'
import React from 'react'
import { Button, CssVarsProvider, Tab, TabList, TabPanel, Tabs, useColorScheme } from '@mui/joy'
import Header from '@/components/header'
import List from '@/components/List'

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
  return (
    <main>
      <CssVarsProvider>
        <Header>
          <ModeToggle />
        </Header>
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
      </CssVarsProvider>
    </main>
  )
}
