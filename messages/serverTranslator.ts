import { createTranslator } from 'next-intl';
import spanish from "./es.json"
import korean from "./ko.json"
import english from "./en.json"

const messages = {
    basic: 'Hello {name}!',
    rich: 'Hello <b>{name}</b>!'
};


export const useTranslatorServer = (locale = "es",) => {

    const t = createTranslator({ locale: 'es', messages: spanish });
    return t

}
// This creates the same function that is returned by `useTranslations`.
// Since there's no provider, you can pass all the properties you'd
// usually pass to the provider directly here.
const t = createTranslator({ locale: 'en', messages });

// Result: "Hello world!"
console.log(t('basic', { name: 'world' }))

// Rich text uses functions that accept and return a string.
// Result: "Hello <b>world</b>!"
console.log(t.rich('rich', {
    name: 'world',
    b: (chunks) => `<b>${chunks}</b>`
}))