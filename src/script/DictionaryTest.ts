import { Script } from "laya/components/Script";
import Dictionary from "../data_structures/Dictionary";

export default class DictionaryTest extends Script {
    constructor() {
        super();
    }

    onEnable() {
        console.log('DictionaryTest~~');

        const dictionary = new Dictionary();

        dictionary.set('Gandalf', 'gandalf@email.com');
        dictionary.set('John', 'johnsnow@email.com');
        dictionary.set('Tyrion', 'tyrion@email.com');

        console.log(dictionary.hasKey('Gandalf'));

        console.log(dictionary.size());
        console.log(dictionary.keys());
        console.log(dictionary.values());
        console.log(dictionary.get('Tyrion'));

        dictionary.remove('John');
        console.log(dictionary.keys());
        console.log(dictionary.values());
        console.log(dictionary.keyValues());

        dictionary.forEach((k, v) => { console.log('forEach: ', `key:${k},value:${v}`) });

    }
}