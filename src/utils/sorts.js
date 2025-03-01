/**
 *
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * */

export const mapOrder = (originalArray, orderArray, key) => {
    if (!originalArray || !orderArray || !key) return [];

    const clonedArray = [...originalArray];
    const orderedArray = clonedArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
    });

    return orderedArray;
};

/**
 * Example:
 */
/** 
 const originalItems = [
    { id: "id-1", name: "One" },
    { id: "id-2", name: "Two" },
    { id: "id-3", name: "Three" },
    { id: "id-4", name: "Four" },
    { id: "id-5", name: "Five" },
];
const itemOrderIds = ["id-5", "id-4", "id-2", "id-3", "id-1"];
const key = "id";

const orderedArray = mapOrder(originalItems, itemOrderIds, key);
console.log("Original:", originalItems);
console.log("Ordered:", orderedArray);
*/

/**
 * Results:
 * Hàm sort nó sẽ sắp xếp lại mảng originalItems theo thứ tự của mảng itemOrderIds
 * ví dụ vị trí id-1 trong mảng itemOrderIds là 4 và vị trí của id-2 trong mảng itemOrderIds là 2 => 4-2>0 => id-1 sẽ đứng sau id-2
 * => mảng originItems sẽ được sắp xếp lại: ['id-2', 'id-1', 'id-3', 'id-4', 'id-5']
 * Tiếp tục vị trí id-1 trong mảng itemOrderIds là 4 và vị trí của id-3 trong mảng itemOrderIds là 3 => 4-3>0 => id-1 sẽ đứng sau id-3
 * => mảng originItems sẽ được sắp xếp lại: ['id-2', 'id-3', 'id-1', 'id-4', 'id-5']
 * ....cứ tương tiếp như vậy và sau đó nó sẽ lặp lại khi nào mà mảng được sắp xếp đúng vi trí theo mảng itemOrderIds
 * 
 * Ordered:
 *  [
      { id: 'id-5', name: 'Five' },
      { id: 'id-4', name: 'Four' },
      { id: 'id-2', name: 'Two' },
      { id: 'id-3', name: 'Three' },
      { id: 'id-1', name: 'One' }
  * ]
 */
