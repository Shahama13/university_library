
const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,

        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!
        },

        databaseUrl: process.env.DATABASE_URL,
        upstash: {
            redis_url: process.env.UPSTASH_REDIS_URL,
            redis_token: process.env.UPSTASH_REDIS_TOKEN,
            qstash_url: process.env.QSTASH_URL,
            qstash_token: process.env.QSTASH_TOKEN
        },

      

    }
}

export default config