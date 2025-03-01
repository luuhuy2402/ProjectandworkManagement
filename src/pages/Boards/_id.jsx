// Board details
import { Container } from "@mui/material";
import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";

function Board() {
    return (
        <Container disableGutters maxWidth="false" sx={{ height: "100vh" }}>
            <AppBar />
            <BoardBar board={mockData?.board} />
            <BoardContent board={mockData?.board} />
        </Container>
    );
}

export default Board;
