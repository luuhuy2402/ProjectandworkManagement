import { Box, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MENU_STYLES = {
    color: "white",
    bgcolor: "transparent",
    border: "none",
    paddingX: "5px",
    borderRadius: "4px",
    ".MuiSvgIcon-root": {
        color: "white",
    },
    "&:hover": {
        bgcolor: "#a9c4ca",
    },
};

function BoardBar() {
    return (
        <Box
            sx={{
                width: "100%",
                height: (theme) => theme.custom.boardBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                paddingX: 2,
                overflowX: "auto",
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#394f6b" : "#1FA2A5",
                borderBottom: "1px solid white",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                    sx={MENU_STYLES}
                    icon={<DashboardIcon />}
                    label="Dashboard"
                    clickable
                />

                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace"
                    clickable
                />

                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDriveIcon />}
                    label="Add To Google Drive"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterListIcon />}
                    label="Filters"
                    clickable
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": { borderColor: "white" },
                    }}
                >
                    Invite
                </Button>
                <AvatarGroup
                    max={4}
                    sx={{
                        "& .MuiAvatar-root": {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            border: "1px solid ",
                        },
                    }}
                >
                    <Tooltip title="Remy Sharp">
                        <Avatar
                            alt="Remy Sharp"
                            src="https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/04/hinh-anh-de-thuong-2.jpg.webp"
                        />
                    </Tooltip>

                    <Tooltip title="Travis Howard">
                        <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                        />
                    </Tooltip>

                    <Tooltip title="Cindy Baker">
                        <Avatar
                            alt="Cindy Baker"
                            src="/static/images/avatar/3.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="Agnes Walker">
                        <Avatar
                            alt="Agnes Walker"
                            src="/static/images/avatar/4.jpg"
                        />
                    </Tooltip>
                    <Tooltip title="Trevor Henderson">
                        <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    );
}

export default BoardBar;
