import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextRequest, NextResponse } from 'next/server'
import { NextApiHandler, NextApiRequest } from 'next'
import { AppRouteHandlerFn } from '@auth0/nextjs-auth0/src/helpers/with-api-auth-required'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

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
  [key: string]: AppRouteHandlerFn
} = {
  item: handleInventoryItems,
  shopping: handleShoppingItems,
}

export default Gets
