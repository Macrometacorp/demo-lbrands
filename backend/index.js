import { Router } from 'itty-router'
const { uuid } = require('@cfworker/uuid')

const jsc8 = require('jsc8')
const queryString = require('query-string')

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

const CUSTOMER_ID_HEADER = 'x-customer-id'

const getCorsCompliantHeaders = headers => ({ ...corsHeaders, ...headers })

const client = new jsc8({
    url: C8_URL,
    fabricName: C8_FABRIC,
    apiKey: C8_API_KEY,
    agentOptions: {
        maxSockets: 50000,
    },
    agent: fetch,
})

const executeQuery = async (c8qlKey, bindValue, body) => {
    const { query, bindVars } = queries(c8qlKey, bindValue, body)
    let result
    try {
        result = await client.executeQuery(query, bindVars)
    } catch (err) {
        result = err
    }
    return result
}

const getCustomerId = request => request.headers.get(CUSTOMER_ID_HEADER)

const getLastPathParam = request => {
    const splitUrl = request.url.split('/')
    return splitUrl[splitUrl.length - 1]
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

router.post('/api/setup', async () => {
    await setup(client)
    return new Response('Setup successful!!', {
        headers: getCorsCompliantHeaders(),
    })
})

router.post('/api/signup', async request => {
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

    if (!result.error) {
        const res = await executeQuery('AddFriends', { username })
    }

    const body = JSON.stringify(result)
    return new Response(body, { headers: getCorsCompliantHeaders() })
})

router.post('/api/signin', async request => {
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

router.get('/api/whoami', request => {
    const customerId = getCustomerId(request)
    let message = 'No current user'
    let status = 404
    if (customerId !== 'null' && customerId) {
        message = customerId
        status = 200
    }
    return new Response(JSON.stringify({ message }), {
        status,
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/fashionItems/:id', async request => {
    const { params } = request
    const fashionItemId = params.id
    const item = await executeQuery('GetFashionItem', { fashionItemId })
    return new Response(JSON.stringify(item), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/fashionItems', async request => {
    const parsed = queryString.parseUrl(request.url)
    const {
        query: { category },
    } = parsed

    const items = await executeQuery('ListFashionItems', {
        category: category.toUpperCase(),
    })

    return new Response(JSON.stringify(items), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/image/:id', async request => {
    const { params } = request
    const imageId = params.id
    const res = await LBRANDS_IMAGES.get(imageId, 'arrayBuffer')
    const response = new Response(res, {
        headers: getCorsCompliantHeaders({ 'Content-Type': 'image/jpeg' }),
    })
    return response
})

router.get('/api/cart/:id', async request => {})
router.get('/api/cart', async request => {
    const customerId = getCustomerId(request)
    // let body = { error: true, code: 400, message: 'Customer Id not provided' }
    const res = await executeQuery('ListItemsInCart', {
        customerId,
    })
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})
router.post('/api/cart', async request => {
    const customerId = getCustomerId(request)
    const { fashionItemId, quantity, price, color, size } = await request.json()
    const res = await executeQuery('AddToCart', {
        customerId,
        fashionItemId,
        quantity,
        price,
        color,
        size,
    })

    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})
router.put('/api/cart', async request => {
    const customerId = getCustomerId(request)
    const { fashionItemId, quantity, color, size } = await request.json()
    const res = await executeQuery('UpdateCart', {
        customerId,
        fashionItemId,
        quantity,
        color: color.replace(/\s/g, '_'),
        size,
    })

    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.delete('/api/cart', async request => {
    const customerId = getCustomerId(request)
    const { fashionItemId, color, size } = await request.json()
    const res = await executeQuery('RemoveFromCart', {
        customerId,
        fashionItemId,
        color: color.replace(/\s/g, '_'),
        size,
    })

    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/orders', async request => {
    const customerId = getCustomerId(request)
    // let body = { error: true, code: 400, message: 'Customer Id not provided' }
    const res = await executeQuery('ListOrders', {
        customerId,
    })
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/recommendations', async request => {
    const customerId = getCustomerId(request)
    // let body = { error: true, code: 400, message: 'Customer Id not provided' }

    const res = await executeQuery('GetRecommendations', { customerId })
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/recommendations/*', async request => {
    const customerId = getCustomerId(request)
    // let body = { error: true, code: 400, message: 'Customer Id not provided' }
    const fashionItemId = getLastPathParam(request)
    const res = await executeQuery('GetRecommendationsByFashionItems', {
        customerId,
        fashionItemId,
    })
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.post('/api/orders', async request => {
    const customerId = getCustomerId(request)
    const { fashionItems, zipcode } = await request.json()
    const orderDate = Date.now()
    const orderId = `${orderDate.toString()}:${customerId}`

    const cleanedFashionItems = []
    const boughtQuantities = []

    fashionItems.forEach(item => {
        const { price, color, size, fashionItemId, quantity } = item
        cleanedFashionItems.push({
            price,
            color,
            size,
            fashionItemId,
            quantity,
        })
        boughtQuantities.push({ _key: `${zipcode}:${fashionItemId}`, quantity })
    })

    const body = {
        _key: orderId,
        orderDate,
        fashionItems: cleanedFashionItems,
        customerId,
    }

    const res = await executeQuery(
        'Checkout',
        {
            customerId,
        },
        body
    )
    if (!res.error) {
        executeQuery('AddPurchased', { orderId }).then(() => {
            console.log('Added purchase!')
        })

        executeQuery('UpdateInventory', null, boughtQuantities).then(data => {
            console.log('Updated inventory!')
        })
    }
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/suggestion/:zipcode', async request => {
    const { params } = request
    const zipcode = params.zipcode
    const res = await executeQuery('GetLocationSuggestion', { key: zipcode })
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/inventory', async request => {
    const parsed = queryString.parseUrl(request.url)
    const {
        query: { zipcode, fashionItemId },
    } = parsed
    const res = await executeQuery('GetInventoryDetails', {
        zipcode,
        fashionItemId,
    })
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/search', async request => {
    const search = request.query.q
    const items = await executeQuery('Search', { search: search.toUpperCase() })

    return new Response(JSON.stringify(items), {
        headers: getCorsCompliantHeaders(),
    })
})

router.get('/api/hot', async request => {
    const res = await executeQuery('GetHotDeals')
    return new Response(JSON.stringify(res), {
        headers: getCorsCompliantHeaders(),
    })
})

router.all(
    '*',
    () =>
        new Response('404, route not found!', {
            status: 404,
            headers: getCorsCompliantHeaders(),
        })
)
