import { NextRequest, NextResponse } from 'next/server'

import Gets from './gets'
import Posts from './posts'
import { NextApiRequest, NextApiResponse } from 'next'

type Parameters = { params: { slug: string } }

export async function GET(request: NextRequest, context: Parameters) {
  let route = context.params.slug
  const handler = route && Gets.hasOwnProperty(route) && Gets[route]
  try {
    if (handler) {
      return await handler(request, context)
    } else {
      return new Response(null, { status: 404 })
    }
  } catch (error) {
    console.log(error)
    // @ts-ignore
    return new Response(error, { status: 500 })
  }
}

export async function POST(request: NextRequest, context: Parameters) {
  let route = context.params.slug
  const handler = route && Posts.hasOwnProperty(route) && Posts[route]
  try {
    if (handler) {
      return await handler(request, context)
    } else {
      return new Response(null, { status: 404 })
    }
  } catch (error) {
    console.log(error)
    // @ts-ignore
    return new Response(error, { status: 500 })
  }
}
