import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCards from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Column({ column }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumnStyles = {
        // toachAction: "none",
        transform: CSS.Translate.toString(transform),
        transition,
        /**Chiều cao phải luôn max 100% vì nếu ko sẽ lỗi lúc kéo column ngắn qua một column dài thì phải kéo
         * ở khu vực ở giữa rất khó chịu, Kết hợp với {...listeners} nằm ở Box chứ không phải nằm ở div ngoài đẻ tránh trường hợp
         * kéo vào vùng xanh
         */
        height: "100%",
        opacity: isDragging ? 0.5 : undefined,
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
    // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ có bug do các column có chiều cao khác nhau
    return (
        <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
            <Box
                {...listeners}
                sx={{
                    minWidth: "300px",
                    maxWidth: "300px",
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "#3a3f59" // "#333643"
                            : "#b7f1f3", // "#ebecf0",
                    ml: 2,
                    borderRadius: "6px",
                    height: "fit-content",
                    maxHeight: (theme) =>
                        `calc(
                            ${theme.custom.boardContentHeight} - 
                            ${theme.spacing(5)})`,
                }}
            >
                {/* Box column header */}
                <Box
                    sx={{
                        height: (theme) => theme.custom.columnHeaderHeight,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title="More options">
                            <ExpandMoreIcon
                                sx={{
                                    color: "text.primary",
                                    cursor: "pointer",
                                }}
                                id="basic-column-dropdown"
                                aria-controls={
                                    open
                                        ? "basic-menu-column-dropdown"
                                        : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>

                        <Menu
                            id="basic-menu-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-column-dropdown",
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPasteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* Box column content */}
                <ListCards cards={orderedCards} />

                {/* Box column footer */}
                <Box
                    sx={{
                        height: (theme) => theme.custom.columnFooterHeight,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title="Drag to move">
                        <DragHandleIcon sx={{ cursor: "pointer" }} />
                    </Tooltip>
                </Box>
            </Box>
        </div>
    );
}
Column.propTypes = {
    column: PropTypes.shape({
        title: PropTypes.string,
        cards: PropTypes.arrayOf(PropTypes.object),
        cardOrderIds: PropTypes.array,
        _id: PropTypes.string,
    }).isRequired,
};

export default Column;
