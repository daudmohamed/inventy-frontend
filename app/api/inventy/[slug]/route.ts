import { NextRequest } from 'next/server'

import Gets from './gets'
import Posts from './posts'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  let route = params.slug
  const handler = route && Gets.hasOwnProperty(route) && Gets[route]
  try {
    if (handler) {
      return await handler(request)
    } else {
      return new Response(null, { status: 404 })
    }
  } catch (error) {
    console.log(error)
    return new Response(null, { status: error.status || 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  let route = params.slug

  console.log('slug', route)
  const handler = route && Posts.hasOwnProperty(route) && Posts[route]
  try {
    if (handler) {
      return await handler(request)
    } else {
      return new Response(null, { status: 404 })
    }
  } catch (error) {
    console.log(error)
    return new Response(null, { status: error.status || 500 })
  }
}
