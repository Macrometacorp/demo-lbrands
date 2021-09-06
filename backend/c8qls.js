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
    }
    return queryObj
}

export default queries
