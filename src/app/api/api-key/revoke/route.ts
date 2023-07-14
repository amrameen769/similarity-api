import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RevokeApiData } from "@/types/api"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

const handler = async (req: NextApiRequest, res: NextApiResponse<RevokeApiData>) => {
    const user = await getServerSession(authOptions).then((res) => {
        return res?.user
    }).catch((error) => {
        console.log(error);
    })

    if (!user) {
        return NextResponse.json({
            error: 'Unauthorized',
            createdApiKey: null
        }, {
            status: 401
        })
    }

    try {
        const validApiKey = await db.apiKey.findFirst({
            where: {
                userId: user.id,
                enabled: true
            }   
        })

        if(!validApiKey) {
            return NextResponse.json({
                error: 'This API Key could not be revoked',
                success: false
            })
        }

        await db.apiKey.update({
            where: {
                id: validApiKey.id
            },
            data: {
                enabled: false
            }
        })

        return NextResponse.json({
            error: null,
            success: true
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: error.issues, success: null
            })
        }
        return NextResponse.json({
            error: "Internal Server Error",
            success: null
        }, {
            status: 500
        })
    }
}

export { handler as POST }