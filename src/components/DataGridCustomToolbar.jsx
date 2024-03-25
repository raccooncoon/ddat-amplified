import {Search} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery
} from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  subtags,
  setSubtags
}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  let onChange = (event, newFormats) => {
    setSubtags(newFormats);
  };

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
          <FlexBetween>
            <ToggleButtonGroup
                size="small"
                value={subtags}
                onChange={onChange}
                aria-label="text formatting"
                sx={{
                  paddingRight: "1rem",
                }}
            >
              <ToggleButton value="insert" aria-label="bold">
                insert
              </ToggleButton>
              <ToggleButton value="select" aria-label="bold">
                select
              </ToggleButton>
              <ToggleButton value="update" aria-label="bold">
                update
              </ToggleButton>
              <ToggleButton value="delete" aria-label="bold">
                delete
              </ToggleButton>
            </ToggleButtonGroup>
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
        </FlexBetween>
      </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
