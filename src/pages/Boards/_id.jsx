// Board details
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis";
// import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";

function Board() {
    const [board, setBoard] = useState(null);
    useEffect(() => {
        const boardId = "67db8e1449c8b5b5bf0269ad";
        //Call API
        fetchBoardDetailsAPI(boardId).then((board) => {
            setBoard(board);
        });
    }, []);
    console.log("hello", board);
    return (
        <Container disableGutters maxWidth="false" sx={{ height: "100vh" }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} />
        </Container>
    );
}

export default Board;
