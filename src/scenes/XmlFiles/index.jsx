import {Box, useMediaQuery, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import {generateClient} from "aws-amplify/api";
import {getXmlModel, listXmlModels} from "../../graphql/queries.js";

const XmlFiles = () => {
  const client = generateClient(); // AWS Amplify API 클라이언트를 생성합니다.
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState({});
  const [selectedData, setSelectedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const { data : sampleData } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 20,
  //   maxColumns: 5,
  // });
  //
  // console.table(sampleData);

  useEffect(() => {
    getXmlFiles().then(() => setIsLoading(false));
  }, [pageSize]);

  const getXmlFiles = async () => {
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

  const getXmlFile = async (id) => {
    try {
      const response = await client.graphql({
        query: getXmlModel,
        variables: {
          id: id
        },
      });
      setSelectedData(response.data);
      console.log("items =>> ", response.data.getXmlModel);
    } catch (error) {
      console.error('Error fetching xml files:', error);
    }
  }

  const getCrud = (crud) => {
    switch (crud) {
      case "insert":
        return <strong>C</strong>;
      case "select":
        return <strong>R</strong>
      case "update":
        return <strong>U</strong>;
      case "delete":
        return <strong>D</strong>;
      default:
        return "";
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
      hide: true,
    },
    {
      field: "subtag",
      headerName: "CRUD",
      width: 70,
      renderCell: (params) => getCrud(params.value)
    },
    {
      field: "moduleName",
      headerName: "SERVICES",
      width: 100,
      hide: !isNonMobile,
    },
    {
      field: "namespace",
      headerName: "NAME SPACE",
      flex: 2,
      hide: !isNonMobile,
    },
    {
      field: "fileName",
      headerName: "FILE NAME",
      flex: 1,
      hide: !isNonMobile,
    },
    {
      field: "xmlid",
      headerName: "Mapper ID",
      flex: 1,
    },
    {
      field: "context",
      headerName: "XML MAPPER CONTEXT",
      flex: 3,
      hide: !isNonMobile,
    },
    {
      field: "urlCount",
      headerName: "URL COUNT",
      flex: 1,
    },
    {
      field: "idtest",
      headerName: "CALLER",
      flex: 1,
      hide: true,
      renderCell: (params) => {
        return (
            <strong>{params.value}</strong>
        );
      }
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
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              checkboxSelection={false}
              onRowClick={(params) => {
                console.log(params.row);
                getXmlFile(params.row.id).then(r => console.log(r));
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
