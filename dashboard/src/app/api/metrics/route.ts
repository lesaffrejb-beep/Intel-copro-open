import { NextResponse } from 'next/server'
import { getMetrics } from '@/lib/metrics'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const metrics = await getMetrics()
    return NextResponse.json(metrics)
  } catch (err) {
    console.error('[metrics API]', err)
    return NextResponse.json({ error: 'Erreur lecture métriques' }, { status: 500 })
  }
}
