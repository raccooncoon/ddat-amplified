import {Box, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import {generateClient} from "aws-amplify/api";
import {listXmlModels} from "../../graphql/queries.js";

const XmlFiles = () => {
  const client = generateClient(); // AWS Amplify API 클라이언트를 생성합니다.
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchXmlFiles().then(() => setIsLoading(false));
  }, [pageSize]);

  const fetchXmlFiles = async () => {
    try {
      const response = await client.graphql({
        query: listXmlModels,
        variables: {
          limit: pageSize
        },
      });
      setData(response.data);
      console.log("items =>> ", response.data.listXmlModels.items);
    } catch (error) {
      console.error('Error fetching xml files:', error);
    }
  }

  const columns = [
    {
      field: "moduleName",
      headerName: "서비스명",
      flex: 1,
    },
    {
      field: "subtag",
      headerName: "CRUD",
      flex: 1,
    },
    {
      field: "namespace",
      headerName: "네임스페이스",
      flex: 2,
    },
    {
      field: "fileName",
      headerName: "파일네임",
      flex: 1,
    },
    {
      field: "xmlid",
      headerName: "실행 함수명",
      flex: 1,
    },
    {
      field: "context",
      headerName: "CONTEXT",
      flex: 4,
    },
    {
      field: "context1",
      headerName: "자세히 보기",
      flex: 1,
    },
    {
      field: "context2",
      headerName: "호출 함수명",
      flex: 1,
    },
    {
      field: "urlCount",
      headerName: "최초 호출건",
      flex: 0.5,
    },
  ];

  return (
      <Box m="1.5rem 2.5rem">
        <Header title="XML FILES" subtitle="subtitle"/>
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
              rows={(data && data?.listXmlModels?.items) || []}
              columns={columns}
              //rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
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
