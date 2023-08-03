import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const handleAddItem = withApiAuthRequired(async function items(req: NextRequest) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req)

  const response = await fetch(`${API_URL}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(await req.json()),
  })
  const item = await response.json()
  return NextResponse.json(item)
})

const Posts: {
  [key: string]: (req: NextRequest) => Promise<NextResponse> | NextResponse
} = {
  item: handleAddItem,
}

export default Posts
