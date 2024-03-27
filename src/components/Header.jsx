import {Box, Typography, useTheme} from "@mui/material";
import UploadXmlFiles from "./UploadXmlFiles.jsx";
import FlexBetween from "./FlexBetween.jsx";

const Header = ({title, subtitle}) => {
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
          {title === "XML FILES" && <UploadXmlFiles/>}
        </FlexBetween>
    );
};

export default Header;
