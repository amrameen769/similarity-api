import { cosineSimilarity } from '@/helpers/cosine-similarity'
import { db } from '@/lib/db'
import { openai } from '@/lib/openai'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { z } from 'zod'

const reqSchema = z.object({
    text1: z.string().max(1000),
    text2: z.string().max(1000),
})

const handler = async (req: Request, res: NextApiResponse) => {

    const body = await req.json()

    const headersList = headers()    
    const apiKey = headersList.get('authorization') as string

    if (!apiKey) {
        return NextResponse.json({
            error: 'Unauthorized'
        }, {
            status: 401,
        })
    }

    // const parsed = reqSchema.safeParse(body);

    // if (!parsed.success) {
    //     return NextResponse.json({
    //         error: 'Bad Request'
    //     }, {
    //         status: 400
    //     })
    // }

    try {
        const { text1, text2 } = reqSchema.parse(body)
        

        const validApiKey = await db.apiKey.findFirst({
            where: {
                key: apiKey,
                enabled: true
            }
        })

        if (!validApiKey) {
            return NextResponse.json({
                error: 'Unauthorized'
            }, {
                status: 401
            })
        }

        const start = new Date();

        // const embedding = await Promise.all([text1, text2].map(async (text) => {            
        //     const res = await openai.createEmbedding({
        //         model: 'text-embedding-ada-002',
        //         input: text
        //     })

        //     return res.data.data[0].embedding
        // }))

        const embedding = [[1,2,3], [1,2,3]]

        const similarity = cosineSimilarity(embedding[0], embedding[1])

        const duration = new Date().getTime() - start.getTime()

        // persist request

        await db.apiRequest.create({
            data: {
                duration,
                method: req.method as string,
                path: req.url as string,
                status: '200',
                apiKeyId: validApiKey.id,
                usedApiKey: validApiKey.key,
            }
        })

        return NextResponse.json({
            success: true,
            text1,
            text2,
            similarity
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: error.issues
            }, {
                status: 500
            })
        }
        
        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        })
    }
}

export { handler as POST }