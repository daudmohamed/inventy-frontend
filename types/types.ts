import { NextRequest, NextResponse } from 'next/server'

export type Context = {
  params?: Record<string, string | string[]>
}
export type ApiHandler = (
  /**
   * Incoming request object.
   */
  req: NextRequest,
  /**
   * Context properties on the request (including the parameters if this was a
   * dynamic route).
   */
  ctx: Context,
) => Promise<NextResponse> | NextResponse
