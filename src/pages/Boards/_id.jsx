// Board details
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import {
    createNewCardAPI,
    createNewColumnAPI,
    fetchBoardDetailsAPI,
} from "~/apis";
// import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";

function Board() {
    const [board, setBoard] = useState(null);
    useEffect(() => {
        const boardId = "67e0b0e9e39fefaf98d82e33";
        //Call API
        fetchBoardDetailsAPI(boardId).then((board) => {
            setBoard(board);
        });
    }, []);

    //Gọi API tạo mới Column và cập nhật lại board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id,
        });
        console.log(" createdColumn", createdColumn);
        //Cập nhật lại board
    };

    //Gọi API tạo mới Card và cập nhật lại board
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id,
        });
        console.log(" createdCard", createdCard);
        //Cập nhật lại board
    };

    return (
        <Container disableGutters maxWidth="false" sx={{ height: "100vh" }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
            />
        </Container>
    );
}

export default Board;
