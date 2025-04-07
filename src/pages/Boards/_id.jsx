// Board details
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    createNewCardAPI,
    createNewColumnAPI,
    deleteColumnDetailsAPI,
    movingCardToDifferentColumnAPI,
    updateBoardDetailsAPI,
    updateColumnDetailsAPI,
} from "~/apis";
// import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import {
    fetchBoardDetailsAPI,
    selectCurrentActiveBoard,
    updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { generatePlaceholderCard } from "~/utils/formatters";

function Board() {
    const dispatch = useDispatch();
    const board = useSelector(selectCurrentActiveBoard);

    useEffect(() => {
        const boardId = "67e0b0e9e39fefaf98d82e33";
        //Call API
        dispatch(fetchBoardDetailsAPI(boardId));
    }, [dispatch]);

    //Gọi API tạo mới Column và cập nhật lại board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id,
        });

        //Thêm card giữ chỗ vào column mới tạo
        createdColumn.cards = [generatePlaceholderCard(createdColumn)];
        createdColumn.cardOrderIds = [
            generatePlaceholderCard(createdColumn)._id,
        ];

        /**Cập nhật lại board
         * Phiá FE tự làm đúng lại state data board thay vì goi lai api fetchBoardDetailsAPI
         * Chú ys: Cách còn tùy thuộc vào từng dự án, có lúc BE sẽ hôc trợ trả về toàn bộ Board dù đây là gọi
         * API tạo Column hay Card thì lúc này chi cần setBoard với dữ liệu trả về từ API chứ ko cần push...
         */

        /**
         * Mặc dù đã copy/clone ra giá trị newBoard nhưng bản chất spread operator này chỉ tạo ra một bản sao nông(shallow copy) của object board
         * Nên nếu có bất kỳ thay đổi nào trong newBoard thì board cũng sẽ bị thay đổi theo
         * Nên dính pahri rules imutability của redux là không được phép thay đổi trực tiếp giá trị của state trong redux store
         * => Nên phải clone sâu(deep copy) object board ra thành newBoard
         */
        // const newBoard = { ...board };
        const newBoard = cloneDeep(board);
        newBoard.columns.push(createdColumn);
        newBoard.columnOrderIds.push(createdColumn._id);

        /**C2: Dùng array.concat thay cho push vì concat là marge các mảng vs nhau và tạo ra mảng mới  */
        // const newBoard = { ...board };
        // newBoard.columns = newBoard.columns.concat(createdColumn);
        // newBoard.columnOrderIds = newBoard.columnOrderIds.concat(
        //     createdColumn._id
        // );

        dispatch(updateCurrentActiveBoard(newBoard));
    };

    //Gọi API tạo mới Card và cập nhật lại board
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id,
        });
        // console.log(" createdCard", createdCard);
        //Cập nhật lại board
        const newBoard = { ...board };
        const columnToUpdate = newBoard.columns.find(
            (column) => column._id === createdCard.columnId
        );

        if (columnToUpdate) {
            //Nếu column rỗng(bản chất vẫn đang chứa 1 cái Placeholder card) thì khi thêm card mới sẽ xóa card đó đi còn
            //ngược lại column ko rỗng thì thêm card thì sẽ thêm tiếp vào cuối mảng
            if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard];
                columnToUpdate.cardOrderIds = [createdCard._id];
            } else {
                columnToUpdate.cards.push(createdCard);
                columnToUpdate.cardOrderIds.push(createdCard._id);
            }
        }

        dispatch(updateCurrentActiveBoard(newBoard));
    };

    // Goị API khi xử lý kéo thả column xong
    //Cập nhật lai mảng columnOrderIds của Board
    const moveColumns = (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
        //này là cập nhật phía UI để tránh bị flickering khi mà API chưa trả về
        const newBoard = { ...board };
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        dispatch(updateCurrentActiveBoard(newBoard));

        //Call API update board
        updateBoardDetailsAPI(board._id, {
            columnOrderIds: dndOrderedColumnsIds,
        });
    };

    /**Khi di chuyển card trong cùng 1 Column
     * Chỉ cần gọi API để cập nhật mảng cardOrderIds của Column chứa nó
     */
    const moveCardInTheSameColumn = (
        dndOrderedCards,
        dndOrderedCardIds,
        columnId
    ) => {
        //update lại state board
        const newBoard = { ...board };
        const columnToUpdate = newBoard.columns.find(
            (column) => column._id === columnId
        );
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards;
            columnToUpdate.cardOrderIds = dndOrderedCardIds;
        }
        dispatch(updateCurrentActiveBoard(newBoard));

        //Gọi API update column
        updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
    };

    /**Khi di chuyển card sang Column khác
     * B1: Cập nhật mảng cardOrderIds cùa Column ban đầu chứa nó
     * B2: Cập nhật mảng cardOrderIds của Column tiếp theo
     * B3: Cập nhập lại trường columnId mới của Card đã kéo
     */
    const moveCardToDifferentColumn = (
        currentCardId,
        prevColumnId,
        nextColumnId,
        dndOrderedColumns
    ) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
        //này là cập nhật phía UI để tránh bị flickering khi mà API chưa trả về
        const newBoard = { ...board };
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        dispatch(updateCurrentActiveBoard(newBoard));

        //Call API
        /**
         * fix trường hợp khi kéo card cuối cùng đi thì trong column sẽ có 1 cái card giữ chỗ thì có id không đúng định dạng nên sẽ bị bug
         * Nên khi mà card cuối cùng của column mà id chứa placeholder-card thì sẽ cho mảng idcardOrderIds của column đó là mảng rỗng trước khi
         * gửi lên phía BE
         */
        let prevCardOrderIds = dndOrderedColumns.find(
            (c) => c._id === prevColumnId
        )?.cardOrderIds;
        if (prevCardOrderIds[0].includes("placeholder-card"))
            prevCardOrderIds = [];

        movingCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(
                (c) => c._id === nextColumnId
            )?.cardOrderIds,
        });
    };

    //Xử lý xóa một column và card bên trong nó
    const deleteColumnDetails = (columnId) => {
        //Update lại state Board
        const newBoard = { ...board };
        newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
            (_id) => _id !== columnId
        );
        dispatch(updateCurrentActiveBoard(newBoard));

        //Gọi API
        deleteColumnDetailsAPI(columnId).then((res) => {
            toast.success(res?.deleteResult);
        });
    };

    if (!board) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <CircularProgress />
                <Typography>Loading Board...</Typography>
            </Box>
        );
    }

    return (
        <Container disableGutters maxWidth="false" sx={{ height: "100vh" }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
                deleteColumnDetails={deleteColumnDetails}
            />
        </Container>
    );
}

export default Board;
