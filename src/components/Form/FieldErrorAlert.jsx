import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

// Component này có nhiệm vụ trả về một Alert Message cho field chỉ định (nếu có).
function FieldErrorAlert({ errors, fieldName }) {
    if (!errors || !errors[fieldName]) return null;
    return (
        <Alert
            severity="error"
            sx={{ mt: "0.7em", ".MuiAlert-message": { overflow: "hidden" } }}
        >
            {errors[fieldName]?.message}
        </Alert>
    );
}
FieldErrorAlert.propTypes = {
    errors: PropTypes.object,
    fieldName: PropTypes.string.isRequired,
};

export default FieldErrorAlert;
