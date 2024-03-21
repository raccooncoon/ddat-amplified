import {Search} from "@mui/icons-material";
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    useMediaQuery
} from "@mui/material";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                {isNonMobile && (
                    <FlexBetween>
                        <GridToolbarColumnsButton/>
                        <GridToolbarDensitySelector/>
                        <GridToolbarExport/>
                    </FlexBetween>
                )}
                <Box/>
                <TextField
                    label="Search..."
                    sx={{mb: "0.5rem", width: "15rem"}}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setSearch(searchInput);
                                        setSearchInput("");
                                    }}
                                >
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
};

export default DataGridCustomToolbar;
