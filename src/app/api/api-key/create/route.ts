import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { CreateApiData } from "@/types/api"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { nanoid } from 'nanoid'
import { z } from "zod"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { NextResponse } from "next/server"
import { error } from "console"

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<CreateApiData>
) => {
    try {
        const user = await getServerSession(authOptions).then((res) => {
            return res?.user
        }).catch((error) => {
            console.log(error);
        })

        if (!user) {
            return NextResponse.json({
                error: 'Unauthorized',
                createdApiKey: null
            })
        }

        const existingApiKey = await db.apiKey.findFirst({
            where: {
                userId: user.id, enabled: true
            }
        })

        if (existingApiKey) {
            return NextResponse.json({
                error: "You already have an API key",
                createdApiKey: null
            })
        }

        const createdApiKey = await db.apiKey.create({
            data: {
                userId: user.id,
                key: nanoid()
            }
        })

        return NextResponse.json({
            error: null,
            createdApiKey
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: error.issues, createdApiKey: null
            })
        }
        return NextResponse.json({
            error: "Internal Server Error",
            createdApiKey: null
        })
    }
}

export { handler as GET }