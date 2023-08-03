import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const handleInventoryItems = withApiAuthRequired(async function items(req: NextApiRequest) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req)

  const response = await fetch(`${API_URL}/item`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const items = await response.json()
  return NextResponse.json(items)
})

const handleShoppingItems = withApiAuthRequired(async function shoppingItems(req: NextRequest) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req)

  const response = await fetch(`${API_URL}/shopping`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const shoppingItems = await response.json()
  return NextResponse.json(shoppingItems)
})

const Gets: {
  [key: string]: (req: NextRequest) => Promise<NextResponse> | NextResponse
} = {
  item: handleInventoryItems,
  shopping: handleShoppingItems,
}

export default Gets
