const queries = (queryName, bindValue, body) => {
    let queryObj
    switch (queryName) {
        case 'signup':
            queryObj = {
                query: `INSERT {_key: @username, password: @passwordHash, customerId: @customerId} INTO UsersTable`,
                bindVars: bindValue,
            }
            break
        case 'signin':
            queryObj = {
                query: `FOR user in UsersTable FILTER user._key == @username AND user.password == @passwordHash RETURN user.customerId`,
                bindVars: bindValue,
            }
            break
        case 'ListFashionItems':
            queryObj = {
                query:
                    'FOR item IN FashionItemsTable FILTER item.category == @category RETURN item',
                bindVars: bindValue,
            }
            break
        case 'GetFashionItem':
            queryObj = {
                query:
                    'FOR item in FashionItemsTable FILTER item._key == @fashionItemId RETURN item',
                bindVars: bindValue,
            }
            break
        case 'Search':
            queryObj = {
                query: `FOR doc IN findFashionItems
                SEARCH PHRASE(doc.heading, @search, "text_en") OR PHRASE(doc.category, @search, "text_en")
                SORT BM25(doc) desc
                RETURN doc`,
                bindVars: bindValue,
            }
            break
        case 'AddToCart':
            queryObj = {
                query: `UPSERT { _key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size) } 
                INSERT { _key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size),customerId: @customerId, fashionItemId: @fashionItemId, quantity: @quantity, price: @price, color: @color, size: @size } 
                UPDATE { quantity: @quantity } IN CartTable`,
                bindVars: bindValue,
            }
            break
        case 'GetLocationSuggestion':
            queryObj = {
                query: `FOR doc IN ZipcodesTable FILTER doc._key == @key RETURN doc`,
                bindVars: bindValue,
            }
            break
        case 'GetInventoryDetails':
            queryObj = {
                query: `FOR inventory IN InventoryTable FILTER inventory._key == CONCAT_SEPARATOR(":", @zipcode, @fashionItemId) RETURN inventory`,
                bindVars: bindValue,
            }
            break
        case 'ListItemsInCart':
            queryObj = {
                query: `FOR item IN CartTable FILTER item.customerId == @customerId RETURN item`,
                bindVars: bindValue,
            }
            break
        case 'GetHotDeals':
            queryObj = {
                query: `FOR item IN PromotionsTable RETURN item`,
            }
            break
        case 'UpdateCart':
            queryObj = {
                query:
                    'FOR item IN CartTable UPDATE {_key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size),quantity: @quantity} IN CartTable',
                bindVars: bindValue,
            }
            break
        case 'UpdateInventory':
            queryObj = {
                query: `FOR obj IN ${JSON.stringify(body)}
                    FOR item IN InventoryTable UPDATE {_key: obj._key, quantity: item.quantity - obj.quantity} IN InventoryTable`
            }
            break
        case 'RemoveFromCart':
            queryObj = {
                query:
                    'REMOVE {_key: CONCAT_SEPARATOR(":", @customerId, @fashionItemId, @color, @size)} IN CartTable',
                bindVars: bindValue,
            }
            break
        case 'ListOrders':
            queryObj = {
                query:
                    'FOR item IN OrdersTable FILTER item.customerId == @customerId RETURN item',
                bindVars: bindValue,
            }
            break
        case 'Checkout':
            queryObj = {
                query: `INSERT ${JSON.stringify(body)} INTO OrdersTable
                LET items = (FOR item IN CartTable FILTER item.customerId == @customerId RETURN item)
                FOR item IN items REMOVE item IN CartTable`,
                bindVars: bindValue,
            }
            break
        case 'AddPurchased':
            queryObj = {
                query: `LET order = first(FOR order in OrdersTable FILTER order._key == @orderId RETURN {customerId: order.customerId, fashionItems: order.fashionItems})
                  LET customerId = order.customerId
                   LET userId = first(FOR user IN UsersTable FILTER user.customerId == customerId RETURN user._id)
                    LET fashionItems = order.fashionItems
                     FOR fashionItem IN fashionItems
                    INSERT {_from: userId, _to: CONCAT("FashionItemsTable/",fashionItem.fashionItemId)} INTO purchased`,
                bindVars: bindValue,
            }
            break

        case 'AddFriends':
            queryObj = {
                query: `LET otherUsers = (FOR users in UsersTable FILTER users._key != @username RETURN users)
                      FOR user in otherUsers
                          INSERT { _from: CONCAT("UsersTable/",@username), _to: CONCAT("UsersTable/",user._key)  } INTO friend`,
                bindVars: bindValue,
            }
            break

        case 'GetRecommendations':
            queryObj = {
                query: `LET userId = first(FOR user in UsersTable FILTER user.customerId == @customerId return user._id)
                    FOR user IN 0..1 ANY userId friend
                    FOR fashionItem IN 0..1 OUTBOUND user purchased
                    LIMIT 3
                    RETURN DISTINCT fashionItem._key`,
                bindVars: bindValue,
            }
            break
        case 'GetRecommendationsByFashionItems':
            queryObj = {
                query: `LET userId = first(FOR user in UsersTable FILTER user.customerId == @customerId return user._id)
                    LET fashionItemId = CONCAT("FashionItemsTable/",@fashionItemId)
                    FOR friendsPurchased IN 0..1 INBOUND fashionItemId purchased
                        FOR user IN 0..1 ANY userId friend
                            FILTER user._key == friendsPurchased._key
                            LIMIT 3
                            RETURN DISTINCT user`,
                bindVars: bindValue,
            }
            break
    }
    return queryObj
}

export default queries
