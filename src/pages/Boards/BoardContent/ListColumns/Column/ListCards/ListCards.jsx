import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CardItem from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/CardItem/CardItem";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
function ListCards({ cards }) {
    return (
        <SortableContext
            items={cards?.map((c) => c._id)}
            strategy={verticalListSortingStrategy}
        >
            <Box
                sx={{
                    p: "0 5px 3px 5px ",
                    m: "0 5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    overflowX: "hidden",
                    overflowY: "auto",
                    maxHeight: (theme) =>
                        `calc(
        ${theme.custom.boardContentHeight} - 
        ${theme.spacing(5)} - 
        ${theme.custom.columnHeaderHeight} - 
        ${theme.custom.columnFooterHeight})`,
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ced0da",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#bfc2cf",
                    },
                }}
            >
                {cards?.map((card) => (
                    <CardItem key={card._id} card={card} />
                ))}
            </Box>
        </SortableContext>
    );
}
ListCards.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            // add other card properties here if needed
        })
    ).isRequired,
};

export default ListCards;
