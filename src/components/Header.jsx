import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import UploadDataToGraphQL from "./UploadDataToGraphQL.jsx";
import FlexBetween from "./FlexBetween.jsx";

const Header = ({title, subtitle}) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const theme = useTheme();
    return (
        <FlexBetween>
            <Box>
                <Typography
                    variant="h2"
                    color={theme.palette.secondary[100]}
                    fontWeight="bold"
                    sx={{mb: "5px"}}
                >
                    {title}
                </Typography>
                <Typography variant="h5" color={theme.palette.secondary[300]}>
                    {subtitle}
                </Typography>
            </Box>
            <UploadDataToGraphQL/>
        </FlexBetween>
    );
};

export default Header;
