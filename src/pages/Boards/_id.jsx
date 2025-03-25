// Board details
import { Container } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
    createNewCardAPI,
    createNewColumnAPI,
    fetchBoardDetailsAPI,
    updateBoardDetailsAPI,
} from "~/apis";
// import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import { generatePlaceholderCard } from "~/utils/formatters";

function Board() {
    const [board, setBoard] = useState(null);
    useEffect(() => {
        const boardId = "67e0b0e9e39fefaf98d82e33";
        //Call API
        fetchBoardDetailsAPI(boardId).then((board) => {
            // xử lý khi mới tạo column mà chưa có card thì tạo thêm 1 card giữ chỗ để kéo thả được
            board.columns.forEach((column) => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)];
                    column.cardOrderIds = [generatePlaceholderCard(column)._id];
                }
            });
            console.log(board);
            setBoard(board);
        });
    }, []);

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
        const newBoard = { ...board };
        newBoard.columns.push(createdColumn);
        newBoard.columnOrderIds.push(createdColumn._id);
        setBoard(newBoard);
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
            columnToUpdate.cards.push(createdCard);
            columnToUpdate.cardOrderIds.push(createdCard._id);
        }
        setBoard(newBoard);
    };

    // Goị API khi xử lý kéo thả column xong
    const moveColumns = async (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
        //này là cập nhật phía UI để tránh bị flickering khi mà API chưa trả về
        const newBoard = { ...board };
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;
        setBoard(newBoard);

        //Call API update board
        await updateBoardDetailsAPI(board._id, {
            columnOrderIds: dndOrderedColumnsIds,
        });
    };

    return (
        <Container disableGutters maxWidth="false" sx={{ height: "100vh" }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
                moveColumns={moveColumns}
            />
        </Container>
    );
}

export default Board;
