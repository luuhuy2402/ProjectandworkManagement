import { Box } from "@mui/material";
import PropTypes from "prop-types";
import ListCoulumns from "~/pages/Boards/BoardContent/ListColumns/ListCoulumns";
import { mapOrder } from "~/utils/sorts";

function BoardContent({ board }) {
    const orderedColumns = mapOrder(
        board?.columns,
        board?.columnOrderIds,
        "_id"
    );
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#394f6b" : "#1FA2A5",
                width: "100%",
                height: (theme) => theme.custom.boardContentHeight,
                p: "10px 0",
            }}
        >
            <ListCoulumns columns={orderedColumns} />
        </Box>
    );
}
BoardContent.propTypes = {
    board: PropTypes.shape({
        columns: PropTypes.array,
        columnOrderIds: PropTypes.array,
    }),
};

export default BoardContent;
