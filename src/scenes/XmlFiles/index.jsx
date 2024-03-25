import {Box, useMediaQuery, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import axios from "axios";

const XmlFiles = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [subtags, setSubtags] = useState(["update","insert","delete"]);

  useEffect(() => {

    const getXmlFiles = () => {
      axios.get(`http://localhost:8080/api/xml_file/context/`, {
        params: {
          page: page,
          size: pageSize,
          //sort: sort,
          //filter: filter,
          search: search,
          subtags: subtags.join(",")
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
    }
    getXmlFiles()
  }, [search, page, pageSize]);

  const columns = [
    {
      headerName: "ID",
      field: "id",
      flex: 1,
      hide: true,
      align: "center",
      headerAlign: "center",
      filterable: false,
    },
    {
      headerName: "CRUD",
      field: "subtag",
      flex: 1,
      align: "center",
      headerAlign: "center",
      filterable: false,
    },
    {
      headerName: "SERVICES",
      field: "moduleName",
      flex: 1,
      align: "center",
      headerAlign: "center",
      hide: !isNonMobile,
      filterable: false,
    },
    {
      headerName: "NAME SPACE",
      field: "namespace",
      flex: 2,
      hide: !isNonMobile,
      headerAlign: "center",
      filterable: false,
    },
    {
      headerName: "FILE NAME",
      field: "fileName",
      flex: 1,
      hide: true,
      align: "center",
      headerAlign: "center",
      filterable: false,
    },
    {
      headerName: "Mapper ID",
      field: "xmlid",
      flex: 1,
      headerAlign: "center",
      filterable: false,
    },
    {
      field: "context",
      headerName: "XML MAPPER CONTEXT",
      flex: 5,
      hide: true,
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      headerName: "URL COUNT",
      field: "urlCount",
      align: "center",
      headerAlign: "center",
      flex: 1,
      filterable: false,
    }
  ];


  return (
      <Box m={isNonMobile ? "1.5rem 2.5rem" : 0}>
        {isNonMobile && <Header title="XML FILES" subtitle="subtitle"/>}
        <Box
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
        >
          <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row.id}
              rows={data && data?.content || []}
              columns={columns}
              rowCount={(data && data?.totalElements) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              autoPageSize ={false}
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="client"
              filterMode="client"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              //checkboxSelection={isNonMobile}
              onRowClick={(params) => {
                console.log("params =>> ", params);
              }}
              components={{Toolbar: DataGridCustomToolbar}}
              componentsProps={{
                toolbar: {searchInput, setSearchInput, setSearch},
              }}
          />
        </Box>
      </Box>
  )

}

export default XmlFiles;
