import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { formatDistance } from 'date-fns'
import LgHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import { Input } from './ui/Input'
import Table from './Table'

const ApiDashboard = async () => {

  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: session.user.id
    }
  })

  const activeApiKey = apiKeys.find(apiKey => apiKey.enabled)

  if (!activeApiKey) notFound()

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id)
      }
    }
  })

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date())
  }))

  return <div className='container flex flex-col gap-6'>
    <LgHeading> Welcome back, {session.user.name}</LgHeading>
    <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
      <Paragraph>Your API Key:</Paragraph>
      <Input className='w-fit truncate' readOnly value={activeApiKey.key} />
      {/* Revoke and Create new */}
    </div>
    <Paragraph className='text-center md:text-left mt-4 -mb-4'>Your API History</Paragraph>
    <Table userRequests={serializableRequests} />
  </div>
}

export default ApiDashboard