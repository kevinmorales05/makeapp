
type Messages = typeof
    import('@/messages/en/en.json') &
    typeof import('@/messages/en/categories.json');


declare interface IntlMessages extends Messages { }