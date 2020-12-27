import { Script } from "laya/components/Script";
import { Stack, StackArray } from "../data_structures/Stack";
export default class StackTest extends Script {
    constructor() {
        super();
    }
    onEnable() {
        const stack = new StackArray();
        console.log(stack.isEmpty());
        stack.push(5);
        stack.push(8);
        console.log(stack.peek());
        stack.push(11);
        console.log(stack.size());
        console.log(stack.isEmpty());
        stack.push(15);
        stack.pop();
        stack.pop();
        console.log(stack.size());
        const stack1 = new Stack();
        stack1.push(5);
        stack1.push(8);
        stack1.clear();
        let decimal2Binary = (decNum) => {
            const remStack = new Stack();
            let number = decNum;
            let rem;
            let binaryString = '';
            while (number > 0) {
                rem = Math.floor(number % 2);
                remStack.push(rem);
                number = Math.floor(number / 2);
            }
            while (!remStack.isEmpty()) {
                binaryString += remStack.pop().toString();
            }
            return binaryString;
        };
        console.log('decimal2Binary:');
        console.log(decimal2Binary(233));
        console.log(decimal2Binary(10));
        console.log(decimal2Binary(1000));
        console.log(decimal2Binary(13));
        let baseConverter = (decNumber, base) => {
            const remStack = new Stack();
            const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let number = decNumber;
            let rem;
            let baseString = '';
            if (!(base >= 2 && base <= 36))
                return '';
            while (number > 0) {
                rem = Math.floor(number % base);
                remStack.push(rem);
                number = Math.floor(number / base);
            }
            while (!remStack.isEmpty())
                baseString += digits[remStack.pop()];
            return baseString;
        };
        console.log('baseConverter:');
        console.log(baseConverter(100345, 2));
        console.log(baseConverter(100345, 8));
        console.log(baseConverter(100345, 16));
        console.log(baseConverter(100345, 35));
    }
}
