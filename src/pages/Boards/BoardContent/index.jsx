import { useState } from "react";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AttachmentIcon from "@mui/icons-material/Attachment";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function BoardContent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
            <Box
                sx={{
                    bgcolor: "inherit",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar-track": { m: 2 },
                }}
            >
                {/* box coloumn 1 */}
                <Box
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
                            height: COLUMN_HEADER_HEIGHT,
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
                            Column title
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
                                    <ListItemText>
                                        Remove this column
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Cloud fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Archive this column
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Box column content */}
                    <Box
                        sx={{
                            p: "0 5px ",
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
                                ${COLUMN_HEADER_HEIGHT} - 
                                ${COLUMN_FOOTER_HEIGHT})`,
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#ced0da",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#bfc2cf",
                            },
                        }}
                    >
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://th.bing.com/th/id/OIF.9meJK9XjSXRF4npH4PIKJg?rs=1&pid=ImgDetMain"
                                title="green iguana"
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Xeoxeo</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0 4px 8px 4px" }}>
                                <Button size="small" startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size="small"
                                    startIcon={<QuestionAnswerIcon />}
                                >
                                    10
                                </Button>
                                <Button
                                    size="small"
                                    startIcon={<AttachmentIcon />}
                                >
                                    15
                                </Button>
                            </CardActions>
                        </Card>

                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Box column footer */}
                    <Box
                        sx={{
                            height: COLUMN_FOOTER_HEIGHT,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button startIcon={<AddCardIcon />}>
                            Add new card
                        </Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon sx={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Box>
                </Box>

                {/* box coloumn 2 */}
                <Box
                    sx={{
                        minWidth: "300px",
                        maxWidth: "300px",
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#3a3f59" // "#333643"
                                : "#b7f1f3",
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
                            height: COLUMN_HEADER_HEIGHT,
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
                            Column title
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
                                    <ListItemText>
                                        Remove this column
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Cloud fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Archive this column
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Box column content */}
                    <Box
                        sx={{
                            p: "0 5px ",
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
                                ${COLUMN_HEADER_HEIGHT} - 
                                ${COLUMN_FOOTER_HEIGHT})`,
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#ced0da",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#bfc2cf",
                            },
                        }}
                    >
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://th.bing.com/th/id/OIF.9meJK9XjSXRF4npH4PIKJg?rs=1&pid=ImgDetMain"
                                title="green iguana"
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Xeoxeo</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0 4px 8px 4px" }}>
                                <Button size="small" startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size="small"
                                    startIcon={<QuestionAnswerIcon />}
                                >
                                    10
                                </Button>
                                <Button
                                    size="small"
                                    startIcon={<AttachmentIcon />}
                                >
                                    15
                                </Button>
                            </CardActions>
                        </Card>

                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Lizard</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Box column footer */}
                    <Box
                        sx={{
                            height: COLUMN_FOOTER_HEIGHT,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button startIcon={<AddCardIcon />}>
                            Add new card
                        </Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon sx={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardContent;
