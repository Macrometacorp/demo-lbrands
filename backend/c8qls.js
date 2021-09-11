const queries = (queryName, bindValue) => {
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
    }
    return queryObj
}

export default queries
