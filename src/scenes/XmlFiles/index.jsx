import {Box, Button, useMediaQuery, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import ViewXmlFilesDetail from "../ViewXmlFilesDetail/index.jsx";
import ViewUrlDetail from "../ViewUrlDetail/index.jsx";
import {get} from 'aws-amplify/api';

const XmlFiles = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [subtags, setSubtags] = useState(["update", "insert", "delete"]);
  const [mapperDetailViewOpen, setMapperDetailViewOpen] = useState(false);
  const [urlViewOpen, setUrlViewOpen] = useState(false);
  const [selectData, setSelectData] = useState({});

  useEffect(() => {
    const getXmlFiles = async () => {
      try {
        const restOperation = await get({
          apiName: 'apiff18fc31',
          path: '/api/xml_file/context/',
          options: {
            queryParams: {
              page: page,
              size: pageSize,
              search: search,
              subtags: subtags.join(",")
            }
          }
        })
        const {body} = await restOperation.response;
        const data = await body.json();
        setIsLoading(false);
        setData(data);
      } catch (e) {
        console.log('GET call failed: ', JSON.parse(e.response));
      }
    }
    getXmlFiles()
  }, [search, page, pageSize, subtags]);

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
      flex: 1,
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
      field: "methodModels",
      headerName: "URL LIST",
      flex: 3,
      hide: true,
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => params.row && JSON.parse(
          params.row.methodModels)?.map(
          m => (m.url)).join(","),
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
      renderCell: (params) => {
        return (
            <Button color="primary" size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.secondary.light,
                      ":hover": {
                        backgroundColor: theme.palette.primary.dark,
                      }
                    }}
                    onClick={() => {
                      console.log("params =>> ", params);
                      (params.row);
                      handleUrlViewOpen(params.row);
                    }}>
              {params.row.urlCount}
            </Button>
        );
      },
    },
    {
      headerName: "Mapper 상세 보기",
      field: "details",
      align: "center",
      headerAlign: "center",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
            <Button color="primary" size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.secondary.light,
                      ":hover": {
                        backgroundColor: theme.palette.primary.dark,
                      }
                    }}
                    onClick={() => {
                      console.log("params =>> ", params);
                      handleMapperDetailViewOpen(params.row);
                    }}>
              {params.row.xmlid}
            </Button>
        );
      },
    }
  ];

  const handleClose = () => {
    setMapperDetailViewOpen(false);
    setUrlViewOpen(false);
  }

  const handleMapperDetailViewOpen = (data) => {
    setMapperDetailViewOpen(true);
    setSelectData(data)
  }

  const handleUrlViewOpen = (data) => {
    setUrlViewOpen(true);
    setSelectData(data)
  }

  return (
      <Box m={isNonMobile ? "1.5rem 2.5rem" : 0}>
        <ViewXmlFilesDetail open={mapperDetailViewOpen} onClose={handleClose}
                            data={selectData}/>
        <ViewUrlDetail open={urlViewOpen} onClose={handleClose}
                       data={selectData}/>
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
              "& .MuiSvgIcon-root ": {
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
              autoPageSize={false}
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="client"
              filterMode="client"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              checkboxSelection={isNonMobile}
              // onRowClick={(params) => {
              //   console.log("params =>> ", params);
              // }}
              components={{Toolbar: DataGridCustomToolbar}}
              componentsProps={{
                toolbar: {
                  searchInput,
                  setSearchInput,
                  setSearch,
                  subtags,
                  setSubtags
                },
              }}
          />
        </Box>
      </Box>
  )
}

export default XmlFiles;
