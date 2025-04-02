export const capitalizeFirstLetter = (val) => {
    if (!val) return "";
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

/**
 * Example:
 */
// const stringTest = "xeoxeo";
// const capString = capitalizeFirstLetter(stringTest);

// console.log("stringTest:", stringTest);
// console.log("capString:", capString);
/**
 * Results:
 *
 * stringTest: Of course, nothing changes =))
 * capString: Xeoxeo
 */

//hàm tạo ra card giữ chỗ khi column kéo hết card đi ( column rỗng ko có card)
export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true,
    };
};
