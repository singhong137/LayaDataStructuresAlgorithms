import { swap, defaultCompare } from "../../util";
function heapify(array, index, heapSize, compareFn) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < heapSize && compareFn(array[left], array[index]) > 0)
        largest = left;
    if (right < heapSize && compareFn(array[right], array[largest]) > 0)
        largest = right;
    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize, compareFn);
    }
}
function buildMaxHeap(array, compareFn) {
    //leaf node have not left&right node. leaf do not need adjust. array.length/2 is last it need adjust node
    for (let i = Math.floor(array.length / 2); i >= 0; --i)
        heapify(array, i, array.length, compareFn);
    return array;
}
export default function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    while (heapSize > 1) {
        swap(array, 0, --heapSize);
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}
