import { Router } from 'itty-router'

const jsc8 = require("jsc8");
const setup =  require("./setup");

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
  });
  

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
    await setup(client);
    return new Response(
        'Setup successful!!',
        {
            headers: getCorsCompliantHeaders(),
        }
    )
})

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
    return new Response(
        'Hello, world! This is the root page of your Worker template.',
        {
            headers: getCorsCompliantHeaders(),
        }
    )
})

/*
This route demonstrates path parameters, allowing you to extract fragments from the request
URL.

Try visit /example/hello and see the response.
*/
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

/*
This shows a different HTTP method, a POST.

Try send a POST request using curl or another tool.

Try the below curl command to send JSON:

$ curl -X POST <worker> -H "Content-Type: application/json" -d '{"abc": "def"}'
*/
router.post('/post', async request => {
    // Create a base object with some fields.
    let fields = {
        asn: request.cf.asn,
        colo: request.cf.colo,
    }

    // If the POST data is JSON then attach it to our response.
    if (request.headers.get('Content-Type') === 'application/json') {
        fields['json'] = await request.json()
    }

    // Serialise the JSON to a string.
    const returnData = JSON.stringify(fields, null, 2)

    return new Response(returnData, {
        headers: getCorsCompliantHeaders({
            'Content-Type': 'application/json',
        }),
    })
})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all(
    '*',
    () =>
        new Response('404, not found!', {
            status: 404,
            headers: getCorsCompliantHeaders(),
        })
)
