const COLLECTIONS = [
    {
        name: 'FashionItemsTable',
        data: [
            {
                _key: 'DrapedBackVintageRose.jpeg',
                description:
                    'Big night in. You’ll love relaxing in this luxe jacquard cami set with an allover sheen and a gorgeous draped back.',
                heading: 'Draped Back Jacquard Cami Set',
                rating: 4.6,
                price: 49.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'DrapedBackVintageRose.jpeg',
                        name: 'Vintage Rose',
                        availableIn: ['06102', '19903', '20002'],
                    },
                    {
                        image: 'DrapedBackPersianTeal.jpeg',
                        name: 'Persian Teal',
                        availableIn: ['06102', '19903', '20002'],
                    },
                    {
                        image: 'DrapedBackDarkViolet.jpeg',
                        name: 'Dark Violet',
                        availableIn: ['06102', '19903', '20002'],
                    },
                ],
            },
            {
                _key: 'LacePlungeHotPink.jpeg',
                description:
                    'A sexy-sweet essential in lustrous satin with delicate sheer lace and eyelash trim.',
                heading: 'Lace Plunge Slip',
                rating: 4.6,
                price: 69.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'LacePlungeHotPink.jpeg',
                        name: 'Hot Pink',
                    },
                    {
                        image: 'LacePlungeGreen.jpeg',
                        name: 'Green',
                    },
                    {
                        image: 'LacePlungeCoconutWhite.jpeg',
                        name: 'Coconut White',
                    },
                ],
            },
            {
                _key: 'WickedOpenLipstick.jpeg',
                description:
                    'Featuring our Wicked bra with the push-up cup technology you love, this sheer mesh and floral lace apron is finished with luxe satin ties. A matching panty completes the look. Ideal for wearing on your wedding night and beyond.',
                heading: 'Wicked Open Back Babydoll',
                rating: 4.4,
                price: 89.5,
                category: 'LINGERIE',
                images: [
                    {
                        image: 'WickedOpenLipstick.jpeg',
                        name: 'Lipstick',
                    },
                    {
                        image: 'WickedOpenCoconutWhite.jpeg',
                        name: 'Coconut White',
                    },
                    {
                        image: 'WickedOpenBlack.jpeg',
                        name: 'Black',
                    },
                ],
            },
            {
                _key: 'CottonJoggerLinenDahlia.jpeg',
                description:
                    "Crisp cotton is made to keep you cool and comfortable with a classic tee and jogger design you'll want to lounge in all day.",
                heading: 'Cotton Jogger Tee-jama',
                rating: 4.3,
                price: 49.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'CottonJoggerLinenDahlia.jpeg',
                        name: 'Linen Dahlia',
                    },
                    {
                        image: 'CottonJoggerPinkHeartDot.jpeg',
                        name: 'Pink Heart Dot',
                    },
                    {
                        image: 'CottonJoggerNoirNavyStripe.jpeg',
                        name: 'Noir Navy Stripe',
                    },
                ],
            },
            {
                _key: 'SatinShortPinkFizz.jpeg',
                description:
                    'For a full eight hours (or more). A sleep-ready PJ set in luxe satin, with a button front, notch collar and decorative piping.',
                heading: 'Satin Short PJ Set',
                rating: 4.2,
                price: 74.5,
                category: 'SLEEP',
                images: [
                    {
                        image: 'SatinShortPinkFizz.jpeg',
                        name: 'Pink Fizz',
                    },
                    {
                        image: 'SatinShortSweetDreamsScript.jpeg',
                        name: 'Sweet Dreams Script',
                    },
                    {
                        image: 'SatinShortPinkPopHeart.jpeg',
                        name: 'Pink Pop Heart',
                    },
                ],
            },
            {
                _key: 'HavanaPushUpPreciousJade.jpeg',
                description:
                    'We have lift off! A classic banded halter with flattering push-up padding. Mix and match this style to find your perfect swim look.',
                heading: 'Havana Push-Up Halter Swim Top',
                rating: 4,
                price: 29.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'HavanaPushUpPreciousJade.jpeg',
                        name: 'Precious Jade',
                    },
                    {
                        image: 'HavanaPushUpBlackWhiteDot.jpeg',
                        name: 'Black & White Dot',
                    },
                    {
                        image: 'HavanaPushUpRipeApricot.jpeg',
                        name: 'Ripe Apricot',
                    },
                ],
            },
            {
                _key: 'MalibuFabSapphire.jpeg',
                description:
                    "A full-cup push-up that's fit to flirt. Get dramatic lift and customizable support. Mix and match this style to find your perfect swim look.",
                heading: 'Malibu Fabulous Push-Up Swim Top',
                rating: 4.4,
                price: 44.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'MalibuFabSapphire.jpeg',
                        name: 'Sapphire',
                    },
                    {
                        image: 'MalibuFabMintFrost.jpeg',
                        name: 'Mint Frost',
                    },
                    {
                        image: 'MalibuFabCheekyRed.jpeg',
                        name: 'Cheeky Red',
                    },
                ],
            },
            {
                _key: 'TahitiScoopOlive.jpeg',
                description:
                    "A little scoop that's perfect for a swim, this bikini top is a perfect addition to your vacation wardrobe.",
                heading: 'Tahiti Scoop Swim Top',
                rating: 4.3,
                price: 29.5,
                category: 'SWIM',
                images: [
                    {
                        image: 'TahitiScoopLemonPrint.jpeg',
                        name: 'Lemon Print',
                    },
                    {
                        image: 'TahitiScoopNero.jpeg',
                        name: 'Nero',
                    },
                    {
                        image: 'TahitiScoopOlive.jpeg',
                        name: 'Olive',
                    },
                ],
            },
        ],
    },
    {
        name: 'OrdersTable',
        data: [
            {
                books: [
                    {
                        _id: 'BooksTable/b2',
                        _key: 'b2',
                        _rev: '_bR90GHu--C',
                        author: 'Steve Doocy',
                        category: 'Cookbooks',
                        name: 'The Happy in a Hurry Cookbook',
                        price: 17.99,
                        rating: 4.6,
                    },
                    {
                        _id: 'BooksTable/b3',
                        _key: 'b3',
                        _rev: '_bR90GHy--_',
                        author: 'Kristin Cavallari',
                        category: 'Cookbooks',
                        name: 'True Comfort',
                        price: 17.52,
                        rating: 4.8,
                    },
                ],
                customerId: '56b83d81-940a-4dd4-c2f4-420c41deeca7',
                orderDate: 1603105787506,
                _key: '1603105787506:56b83d81-940a-4dd4-c2f4-420c41deeca7',
            },
        ],
    },
    { name: 'CartTable', data: [] },
    {
        name: 'UsersTable',
        data: [
            {
                customerId: '56b83d81-940a-4dd4-c2f4-420c41deeca7',
                password: '�y|�\u0018�-�d�\u0007�]?�v#\u0004�\u0006=S,�\\^ר�O',
                _key: 'john.d@macrometa.io',
            },
            {
                customerId: '56b83d81-512a-4dd4-c2f4-310c41deeca7',
                password: '�y|�\u0018�-�d�\u0007�]?�v#\u0004�\u0006=S,�\\^ר�O',
                _key: 'harry.d@macrometa.io',
            },
        ],
    },
    {
        name: 'BestsellersTable',
        data: [
            { _key: 'b1', quantity: 1 },
            { _key: 'b5', quantity: 1 },
            { _key: 'b9', quantity: 1 },
            { _key: 'b13', quantity: 1 },
            { _key: 'b17', quantity: 1 },
        ],
    },
    {
        name: 'ZipcodesTable',
        data: [
            {
                // Connecticut (CT)	Hartford
                _key: 0,
                city: 'Hartford, CT',
                county: 'Hartford County',
                coordinates: '41.77, -72.67',
                zipcodes: [
                    {
                        zipcode: '06101',
                        storeName: 'The Shoppes at Buckland Hills',
                        contact: '(416) 205-1222',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '06102',
                        storeName: 'Westfarms VS',
                        contact: '(416) 205-1222',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                    {
                        zipcode: '06103',
                        storeName: 'Westfarms PINK',
                        contact: '(416) 205-1222',
                        closeTime: '8:00 PM',
                        additionalDetails:
                            'Buy online, pick up in store not available at this location.',
                    },
                ],
            },
            {
                // Deleware (DE)	Dover
                _key: 1,
                city: 'Dover, DE',
                county: 'Kent County',
                coordinates: '39.2, -75.5',
                zipcodes: [
                    { zipcode: '19901', storeName: 'Dover' },
                    { zipcode: '19902', storeName: 'vvv' },
                    { zipcode: '19903', storeName: 'vvv' },
                ],
            },
            {
                // District of Columbia (DC)	Washington
                _key: 2,
                city: 'Washington, DC',
                county: 'District of Columbia',
                coordinates: '38.91, -77.02',
                zipcodes: [
                    { zipcode: '20001', storeName: 'Southland VS' },
                    { zipcode: '20002', storeName: 'Southland PINK' },
                    { zipcode: '20003', storeName: 'Fairlane Town Center' },
                ],
            },
            {
                // Georgia (GA)	Atlanta
                _key: 3,
                zipcodes: ['30301', '30302', '30303'],
            },
            {
                // Indiana (IN)	Indianapolis
                _key: 4,
                zipcodes: ['46201', '46202', '46203'],
            },
            {
                // Iowa (IA)	Davenport Des Moines
                _key: 5,
                zipcodes: ['52801', '52802', '52803'],
            },
            {
                // Kansas (KS)	Wichita
                _key: 6,
                zipcodes: ['67201', '67202', '67203'],
            },
            {
                _key: 7,
                zipcodes: ['74101', '74102', '74103'],
            },
            {
                _key: 8,
                zipcodes: ['84321', '84322', '84323'],
            },
            {
                _key: 9,
                zipcodes: ['98004', '98005', '98006'],
            },
        ],
    },
]

const VIEWS = [
    {
        name: 'findFashionItems',
        properties: {
            links: {
                FashionItemsTable: {
                    analyzers: ['text_en'],
                    fields: {},
                    includeAllFields: true,
                    storeValues: 'none',
                    trackListPositions: false,
                },
            },
        },
    },
]

const collectionHandler = async (client, collection, isEdge) => {
    const { name, data } = collection
    const coll = isEdge ? client.edgeCollection(name) : client.collection(name)
    const exists = await coll.exists()

    const prefix = `${isEdge ? 'Edge ' : ''}Collection ${name}`
    console.log(`${prefix} exists=${exists}`)
    if (!exists) {
        await client.createCollection(name, {}, isEdge)
        console.log(`${prefix} created`)
        if (Array.isArray(data) && data.length)
            if (isEdge) {
                for (edge of data) {
                    await coll.save(data)
                }
            } else {
                await client.insertDocumentMany(name, data)
            }
        console.log(`Data inserted in ${prefix}`)
    } else {
        console.log(`${prefix} already exists. Skipping creation.`)
    }
    return coll
}

const setup = async client => {
    console.log('INIT!!!')
    for (const collection of COLLECTIONS) {
        await collectionHandler(client, collection, false)
    }

    const response = await client.getListOfViews()
    const existingViews = response.result

    for (const view of VIEWS) {
        const { name, properties } = view
        const exists = existingViews.find(
            existingView => existingView.name === name
        )
        if (exists) {
            console.log(`View ${name} exists. Skipping creation.`)
        } else {
            await client.createView(name, properties)
            console.log(`View ${name} created.`)
        }
    }
}

export default setup
