
type Messages = typeof
    import('@/messages/en/en.json') &
    typeof import('@/messages/en/categories.json') & typeof import('@/messages/en/products.json');


declare interface IntlMessages extends Messages { }