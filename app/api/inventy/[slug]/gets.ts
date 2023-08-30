import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'
import { ApiHandler } from '@/types/types'

const API_URL = process.env.API_URL

const handleInventoryItems = withApiAuthRequired(async function items() {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken({
    scopes: ['openid', 'profile', 'email'],
  })

  const response = await fetch(`${API_URL}/item`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const items = await response.json()
  return NextResponse.json(items)
})

const handleShoppingItems = withApiAuthRequired(async function shoppingItems() {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken()

  const response = await fetch(`${API_URL}/shopping`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const shoppingItems = await response.json()
  return NextResponse.json(shoppingItems)
})

const Gets: {
  [key: string]: ApiHandler
} = {
  item: handleInventoryItems,
  shopping: handleShoppingItems,
}

export default Gets
