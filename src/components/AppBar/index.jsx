import { Box, SvgIcon, Typography } from "@mui/material";
import ModeSelect from "~/components/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import Zentask from "~/assets/zentask.svg?react";
import Workspaces from "~/components/AppBar/Menus/Workspaces";
import Recent from "~/components/AppBar/Menus/Recent";
import Starred from "~/components/AppBar/Menus/Starred";
import Templates from "~/components/AppBar/Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "~/components/AppBar/Menus/Profiles";

function AppBar() {
    return (
        <Box
            px={2}
            sx={{
                width: "100%",
                height: (theme) => theme.custom.appBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AppsIcon sx={{ color: "primary.main" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <SvgIcon
                        component={Zentask}
                        fontSize="small"
                        inheritViewBox
                        sx={{ color: "primary.main" }}
                    />
                    <Typography
                        variant="span"
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        Zentask
                    </Typography>
                </Box>
                <Workspaces />
                <Recent />
                <Starred />
                <Templates />
                <Button variant="outlined">Create</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="search"
                    size="small"
                />
                <ModeSelect />
                <Tooltip title="Notification">
                    <Badge
                        color="secondary"
                        variant="dot"
                        sx={{ cursor: "pointer" }}
                    >
                        <NotificationsNoneIcon sx={{ color: "primary.main" }} />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <HelpOutlineIcon
                        sx={{ cursor: "pointer", color: "primary.main" }}
                    />
                </Tooltip>

                <Profiles />
            </Box>
        </Box>
    );
}

export default AppBar;
