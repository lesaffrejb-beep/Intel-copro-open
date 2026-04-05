import { NextRequest, NextResponse } from 'next/server'
import { searchWiki } from '@/lib/wiki'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.trim().length < 2) {
    return NextResponse.json([])
  }
  const results = searchWiki(q)
  return NextResponse.json(results)
}
