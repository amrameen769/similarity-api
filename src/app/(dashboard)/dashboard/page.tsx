import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import ApiDashboard from '@/components/ApiDashboard'
import RequestAPIkey from '@/components/RequestAPIkey'

export const metadata: Metadata = {
  title: "Similarity API | Dashboard",
  description: "Similarity API | Free and OpenSource Text API"
}

const page = async () => {

  const session = await getServerSession(authOptions)

  if (!session) return notFound()

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: session.user.id,
      enabled: true
    }
  })

  return <div className='max-w-7xl mx-auto mt-20'>
    {apiKey ? <ApiDashboard /> : <RequestAPIkey />}
  </div>
}

export default page