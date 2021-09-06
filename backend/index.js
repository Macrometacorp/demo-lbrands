import { Router } from 'itty-router'
const { uuid } = require('@cfworker/uuid')

const jsc8 = require('jsc8')
import setup from './setup'
import queries from './c8qls'

// We support the GET, POST, PUT, DELETE, HEAD, and OPTIONS methods from any origin,
// and allow any header on requests. These headers must be present
// on all responses to all CORS preflight requests. In practice, this means
// all responses to OPTIONS requests.
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Max-Age': '86400',
}

const getCorsCompliantHeaders = headers => ({ ...corsHeaders, ...headers })

const client = new jsc8({
    url: C8_URL,
    apiKey: C8_API_KEY,
    agentOptions: {
        maxSockets: 50000,
    },
    agent: fetch,
})

const executeQuery = async (c8qlKey, bindValue) => {
    const { query, bindVars } = queries(c8qlKey, bindValue)
    let result
    try {
        result = await client.executeQuery(query, bindVars)
    } catch (err) {
        result = err
    }
    return result
}

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', event => {
    const { request } = event
    if (request.method === 'OPTIONS') {
        event.respondWith(handleOptions(request))
    } else {
        event.respondWith(router.handle(request))
    }
})

function handleOptions(request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    let headers = request.headers
    if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
    ) {
        // Handle CORS pre-flight request.
        // If you want to check or reject the requested method + headers
        // you can do that here.
        let respHeaders = {
            ...corsHeaders,
            // Allow all future content Request headers to go back to browser
            // such as Authorization (Bearer) or X-Client-Name-Version
            'Access-Control-Allow-Headers': request.headers.get(
                'Access-Control-Request-Headers'
            ),
        }

        return new Response(null, {
            headers: respHeaders,
        })
    } else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        return new Response(null, {
            headers: {
                Allow: 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
            },
        })
    }
}

// Create a new router
const router = Router()

router.get('/setup', async () => {
    await setup(client)
    return new Response('Setup successful!!', {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/', () => {
    return new Response(
        'Hello, world! This is the root page of your Worker template.',
        {
            headers: getCorsCompliantHeaders(),
        }
    )
})

router.get('/example/:text', ({ params }) => {
    // Decode text like "Hello%20world" into "Hello world"
    let input = decodeURIComponent(params.text)

    // Construct a buffer from our input
    let buffer = Buffer.from(input, 'utf8')

    // Serialise the buffer into a base64 string
    let base64 = buffer.toString('base64')

    // Return the HTML with the string to the client
    return new Response(`<p>Base64 encoding: <code>${base64}</code></p>`, {
        headers: getCorsCompliantHeaders({
            'Content-Type': 'text/html',
        }),
    })
})

router.post('/signup', async request => {
    const { username, password } = await request.json()

    const encodedPassword = new TextEncoder().encode(password)

    const digestedPassword = await crypto.subtle.digest(
        {
            name: 'SHA-256',
        },
        encodedPassword // The data you want to hash as an ArrayBuffer
    )
    const passwordHash = new TextDecoder('utf-8').decode(digestedPassword)
    const customerId = uuid()
    const result = await executeQuery('signup', {
        username,
        passwordHash,
        customerId,
    })

    // TODO: if needed
    // if (!result.error) {
    //     const res = await executeQuery("AddFriends", { username });
    //   }

    const body = JSON.stringify(result)
    return new Response(body, { headers: getCorsCompliantHeaders() })
})

router.post('/signin', async request => {
    const { username, password } = await request.json()
    const encodedPassword = new TextEncoder().encode(password)
    const digestedPassword = await crypto.subtle.digest(
        {
            name: 'SHA-256',
        },
        encodedPassword // The data you want to hash as an ArrayBuffer
    )
    const passwordHash = new TextDecoder('utf-8').decode(digestedPassword)
    const result = await executeQuery('signin', {
        username,
        passwordHash,
    })
    let message = 'User not found'
    let status = 404
    if (result.length) {
        message = result
        status = 200
    }
    const body = JSON.stringify({ message })
    return new Response(body, { status, headers: getCorsCompliantHeaders() })
})

router.all(
    '*',
    () =>
        new Response('404, not found!', {
            status: 404,
            headers: getCorsCompliantHeaders(),
        })
)
