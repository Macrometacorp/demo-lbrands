# demo-lbrands-victoria-secret

**Live Demo: https://cf.macrometa.io/**

Macrometa-lbrands Forever 42 App is a full-stack e-commerce web application that creates a storefront (and backend) for customers to shop for "fictitious" fashion items.

Originally based on the AWS bookstore template app (https://github.com/aws-samples/aws-bookstore-demo-app), this demo replaces all AWS services like below

- AWS DynamoDB,
- AWS Neptune (Graphs),
- AWS ElasticSearch (Search),
- AWS Lambda
- AWS Kinesis

This demo uses Macrometa's geo distributed data platform which provides a `K/V store`, `DynamoDB compatible document database`, `graph database`, `streams` and `stream processing` along with Cloudflare `edgeworkers` for the globally distributed functions as a service.

Unlike typical cloud platforms like AWS, where the backend stack runs in a single region, Macrometa and Cloudflare let you build `stateful distributed microservices that run in 100s of regions around the world concurrently`. The application logic runs in cloudflare's low latency function as a service runtime on cloudflare PoPs and make stateful data requests to the closest Macrometa region. End to end latency for `P90 is < 55ms` from almost everywhere in the world.

As a user of the demo, you can browse and search for fashion items, look at recommendations and best sellers, manage your cart, checkout, view your orders, and more.

## GDN Tenant Account

| **Federation**                                        | **Email**                 | **Passsword** |
| ----------------------------------------------------- | ------------------------- | ------------- |
| [Global Data Network](https://gdn.paas.macrometa.io/) | demo-lbrands@macrometa.io | `xxxxxxxx`    |

## Architecture

![Cloudflare Arch](./cloudflare_summary_diagram.png)

## Data & Control Flows

![Cloudflare End to End](./cloudflare_end_to_end.png)

## Details

### Frontend

- Frontend is a Reactjs application which is hosted using Cloudflare.
- Web assets are stored on Cloudflare's KV store.

### Backend

The core of backend infrastructure consists of Macrometa Document store(DB), Macrometa Edge store(DB), Macrometa Views(search), Macrometa Graphs and Cloudflare workers. Cloudflare workers issue C8QLs to talk with the GDN network.

The application leverages Macrometa GDN document store to store all the data for fashion items, orders, the checkout cart and users. When new purchases or new users are added the corresponding Macrometa Edge collection is also updated. These Edge collections along with Document collection acting as vertices are used by the Macrometa Graphs to generate recommendations for the users. When new purchases are added Macrometa Stream Workers also update the BestSellers Collection store in realtime from which the best sellers leaderboard is generated.

![Forever 42 Backend](./lbrands_backend.png)

**Catalog, Cart, Orders:**

This is implemented using `document collections` functionality in Macrometa GDN

| Entity            | Collection Name   | Collection Type | Comment                                            |
| ----------------- | ----------------- | --------------- | -------------------------------------------------- |
| Catalog           | FashionItemsTable | document        | Collection of the available fashion items.         |
| Cart              | CartTable         | document        | Fashion items customers have addded in their cart. |
| Orders            | OrdersTable       | document        | Past orders of a customer.                         |
| Promotions        | PromotionsTable   | document        | Current fashion items being promoted as hot deals  |
| Store suggestions | ZipcodesTable     | document        | Forever 42 store based on given zipcode            |

**Recommendations:**

This is implemented using `graphs` functionality in Macrometa GDN. Each node in the graph is a `vertex` and the links connecting the nodes are `edges`. Both `vertex` and `edges` are document collections. The `edges` require two additional mandatory indexes i.e., `_from` and `_to`.

| Entity   | Collection Name   | Collection Type | Comment                                      |
| -------- | ----------------- | --------------- | -------------------------------------------- |
| Friends  | friend            | edge            | Edge collection to capture friend relations. |
| Purchase | purchased         | edge            | Edge collection to capture purchases.        |
| Users    | UserTable         | vertex          | Document collection of available users.      |
| Catalog  | FashionItemsTable | vertex          | Collection of the available fashion items.   |
| Social   | UserSocialGraph   | graph           | User social graph                            |

**Search:**

Search is implemented using `views` functionality in Macrometa GDN. Search matches on the `category` or the `name` of fashion item in `FashionItemsTable` with phrase matching.

| Entity | Collection Name  | Collection Type | Comment                               |
| ------ | ---------------- | --------------- | ------------------------------------- |
| Find   | findFashionItems | view            | The view which is queried for search. |

**Indexes:**

Create persistent indexes on the collection for the corresponding attributes

| **Collection**    | **Attribute**                |
| ----------------- | ---------------------------- |
| CartTable         | single index on `customerId` |
| FashionItemsTable | N/A                          |
| friend            | N/A                          |
| OrdersTable       | `customerId`                 |
| UsersTable        | `customerId`, `password`     |
| PromotionsTable   | N/A                          |
| ZipcodesTable     | N/A                          |

## API Details

Below are the list of APIs being used.

**Fashion Items (Macrometa Docuemnt Store DB)**

- GET /api/fashionItems (ListFashionItem)
- GET /api/fashionItems/:id (GetFashionItem)

**Store suggestions (Macormeta Document Store DB)**

- GET /api/suggestion/:zipcode (GetLocationSuggestion)

**Hot deals (Macrometa Document Store DB)**

- GET /api/hot (GetHotDeals)

**Cart (Macrometa Docuemnt Store DB)**

- GET /api/cart (ListItemsInCart)
- POST /api/cart (AddToCart)
- PUT /api/cart (UpdateCart)
- DELETE /api/cart (RemoveFromCart)

**Orders (Macrometa Docuemnt Store DB)**

- GET /api/orders (ListOrders)
- POST /api/orders (Checkout)

**Recommendations (Macrometa Graphs)**

- GET /api/recommendations (GetRecommendations)
- GET /api/recommendations/:fashionItemId (GetRecommendationsByFashionItems)

**Search (Macrometa Views)**

- GET /api/search (Search)

## Queries

C8QLs are used by the Cloudflare workers to communicate with Macrometa GDN.

**signup**:

```js
    INSERT {_key: @username, password: @passwordHash, customerId: @customerId} INTO UsersTable
```

**signin**:

```js
    FOR user in UsersTable FILTER user._key == @username AND user.password == @passwordHash RETURN user.customerId
```

**AddFriends**:

```js
    LET otherUsers = (FOR users in UsersTable FILTER users._key != @username RETURN users)
                      FOR user in otherUsers
                          INSERT { _from: CONCAT("UsersTable/",@username), _to: CONCAT("UsersTable/",user._key)  } INTO friend
```

**ListFashionItems**:

```js
    FOR item IN FashionItemsTable FILTER item.category == @category RETURN item
```

**GetFashionItem**:

```js
    FOR item IN FashionItemsTable FILTER item.category == @category RETURN item
```

**ListItemsInCart**:

```js
    FOR item IN CartTable FILTER item.customerId == @customerId RETURN item
```

**AddToCart**:

```js
    UPSERT { _key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size) }
                INSERT { _key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size),customerId: @customerId, fashionItemId: @fashionItemId, quantity: @quantity, price: @price, color: @color, size: @size }
                UPDATE { quantity: @quantity } IN CartTable
```

**UpdateCart**:

```js
    FOR item IN CartTable UPDATE {_key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size),quantity: @quantity} IN CartTable
```

**RemoveFromCart**:

```js
    REMOVE {_key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size)} IN CartTable
```

**ListOrders**:

```js
    FOR item IN OrdersTable FILTER item.customerId == @customerId RETURN item
```

**Checkout**:

```js
    INSERT ${JSON.stringify(body)} INTO OrdersTable
                LET items = (FOR item IN CartTable FILTER item.customerId == @customerId RETURN item)
                FOR item IN items REMOVE item IN CartTable
```

**AddPurchased**:

```js
    LET order = first(FOR order in OrdersTable FILTER order._key == @orderId RETURN {customerId: order.customerId, fashionItems: order.fashionItems})
                  LET customerId = order.customerId
                   LET userId = first(FOR user IN UsersTable FILTER user.customerId == customerId RETURN user._id)
                    LET fashionItems = order.fashionItems
                     FOR fashionItem IN fashionItems
                    INSERT {_from: userId, _to: CONCAT("FashionItemsTable/",fashionItem.fashionItemId)} INTO purchased
```

**GetRecommendations**:

```js
    LET userId = first(FOR user in UsersTable FILTER user.customerId == @customerId return user._id)
                    FOR user IN 0..1 ANY userId friend
                    FOR fashionItem IN 0..1 OUTBOUND user purchased
                    LIMIT 3
                    RETURN DISTINCT fashionItem._key
```

**GetRecommendationsByFashionItems**:

```js
    LET userId = first(FOR user in UsersTable FILTER user.customerId == @customerId return user._id)
                    LET fashionItemId = CONCAT("FashionItemsTable/",@fashionItemId)
                    FOR friendsPurchased IN 0..1 INBOUND fashionItemId purchased
                        FOR user IN 0..1 ANY userId friend
                            FILTER user._key == friendsPurchased._key
                            LIMIT 3
                            RETURN DISTINCT user
```

**Search**

```js
    FOR doc IN findFashionItems
                SEARCH PHRASE(doc.heading, @search, "text_en") OR PHRASE(doc.category, @search, "text_en")
                SORT BM25(doc) desc
                RETURN doc
```

**GetLocationSuggestion**

```js
    FOR doc IN ZipcodesTable FILTER doc._key == @key RETURN doc
```

**GetHotDeals**

```js
    FOR item IN PromotionsTable RETURN item
```

## Macrometa Views

Search functionality is powered by Macrometa Views. This is saved as `findFashionItems` with below config:

```json
{
  "links": {
    "FashionItemsTable": {
      "analyzers": ["identity"],
      "fields": {
        "heading": {
          "analyzers": ["text_en"]
        },
        "category": {
          "analyzers": ["text_en"]
        }
      },
      "includeAllFields": false,
      "storeValues": "none",
      "trackListPositions": false
    }
  },
  "name": "findFashionItems",
  "primarySort": []
}
```

## Development Details

### Notes

- Fashion item images are stored in Cloudflare KV under `LBRANDS_IMAGES`.
- `frontend` folder contains the code for the UI which is in Reactjs
- `backend` folder contains the backend part. This is responsible for making calls to Macrometa GDN.
- Calls with `/api/` are treated as calls which want to communicate with Macrometa GDN, others are understood to be calls for the web assets.
- `backend/c8qls.js` contains the queries (C8QL). These are executed by calling Macrometa GDN `/cursor` API. The `bind variables` in the body of the request are the parameters to the queries.

# Project setup

## Installing workers CLI

There are multiple ways to install the workers CLI. Official docs say it to install via [npm](https://developers.cloudflare.com/workers/learning/getting-started#2-install-the-workers-cli) or [cargo](https://github.com/cloudflare/wrangler#install-with-cargo).
Additionally the binary can also be installed manually. Details of which can be found [here](https://developer.aliyun.com/mirror/npm/package/@granjef3/wrangler) under the `Manual Install` section - I personally have the binaries.

It is advisable to have `npm` installed via `nvm` to avoid getting into issues when installing global packages. Additional details can be found in their [github repo](https://github.com/cloudflare/wrangler#install-with-npm).

## Configuring the project for deployment

### Obtaining your API token

We will need the Macrometa API token to be able to configure the CLI. Please signup for a macrometa account for the token, or create your own by following the docs if you already have an account [here](https://developers.cloudflare.com/workers/learning/getting-started#6b-obtaining-your-api-token-or-global-api-key)

### Configuring Wrangler with your credentials

Run `wrangler config` and enter the above API token when asked for. More details can be found [here](https://developers.cloudflare.com/workers/learning/getting-started#6c-configuring-wrangler-with-your-credentials)

## Configuring your project

`wrangler.toml` already has the configurations.

> Provide a `C8_API_KEY` with a correct API key before proceeding.

`vars` provides the environment variable we use in the workers itself. They include:

1. `C8_URL`: GDN federation URL
2. `C8_API_KEY`: API key of the tenant being used

## Publishing your project

Make sure to run `npm i` on the project's root to install the necessary dependencies.

## Building the UI

If there are changes to the UI code then first run `npm run build` to make the UI build, else you can directly proceed with publishing.

## Publishing

Run `wrangler publish` and it will deploy your worker along with the static files used by the UI.

# Initialising the collections and streamapp

Once the worker is deployed, execute the following curl:

```
curl -X POST 'https://fashionstore.macrometadev.workers.dev/api/setup'
```

This will create all the collections and dummy data for you.

> Note: This will only populate if the collection or stream app is not already present. If it does it wont create the dummy data, even if the collection is empty. So best to delete the collection if you want it to be populated by the curl.

### After you run the demo do the following:

1. Now login to the tenant and activate the stream app.
2. Edit and save the view with the correct data if not initialised properly. Details can be found in `init.js`
