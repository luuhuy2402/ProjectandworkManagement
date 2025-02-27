import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CardItem({ temporaryHideMedia }) {
    if (temporaryHideMedia) {
        return (
            <Card
                sx={{
                    cursor: "pointer",
                    boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                    overflow: "unset",
                }}
            >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                    <Typography>Xeoxeo</Typography>
                </CardContent>
            </Card>
        );
    }
    return (
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
            <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Xeoxeo</Typography>
            </CardContent>
            <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button size="small" startIcon={<GroupIcon />}>
                    20
                </Button>
                <Button size="small" startIcon={<QuestionAnswerIcon />}>
                    10
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                    15
                </Button>
            </CardActions>
        </Card>
    );
}

// 🛠️ Khai báo kiểu dữ liệu cho props
CardItem.propTypes = {
    temporaryHideMedia: PropTypes.bool, // Hoặc kiểu dữ liệu phù hợp
};

export default CardItem;
