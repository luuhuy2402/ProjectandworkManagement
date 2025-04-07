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

   

    //Gọi API tạo mới Card và cập nhật lại board
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id,
        });
        // console.log(" createdCard", createdCard);
        //Cập nhật lại board
        // const newBoard = { ...board };
        const newBoard = cloneDeep(board);
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
        /**
         * Trường hợp dùng Shallow copy ày lại ko sao bởi vì ở đây ko dùng push làm thay đổi trực tiếp giá trị của mảng mà chỉ đang gán lại
         * toàn bộ giá trị của mảng columns và columnOrderIds cho board bằng 2 mảng mới. Tương tự như dùng concat
         */
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
        /**
         * Trường hợp Immutability ở đây đã đụng tới giá trị cards được coi là read-only (nested object - can thiệp sâu dữ liệu)
         * Nên phải clone sâu(deep copy) object board ra thành newBoard
         */
        //update lại state board
        // const newBoard = { ...board };
        const newBoard = cloneDeep(board);
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
        /**Tương tự đoạn xử lý chỗ hàm moveColumns nên ko ảnh hường Immutability */
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
        /**Tương tự ko bị vấn đề về Immutablity */
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
               
                createNewCard={createNewCard}
                deleteColumnDetails={deleteColumnDetails}

                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </Container>
    );
}

export default Board;
