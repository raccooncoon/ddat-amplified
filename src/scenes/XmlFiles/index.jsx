import {Box, useMediaQuery, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import {generateClient} from "aws-amplify/api";
import {getXmlModel, listXmlModels} from "../../graphql/queries.js";
import UseCurrentAuthenticatedUser from "../../hooks/useCurrentAuthenticatedUser.jsx";

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
    const [filter, setFilter] = useState({});

    // const { data : sampleData } = useDemoData({
    //   dataSet: 'Commodity',
    //   rowLength: 20,
    //   maxColumns: 5,
    // });
    //
    // console.table(sampleData);

    useEffect(() => {
        getXmlFiles().then(() => setIsLoading(false));
    }, [pageSize, search]);

    const getXmlFiles = async () => {
        try {
            const response = await client.graphql({
                query: listXmlModels,
                variables: {
                    filter: {
                        context: {
                            contains: search
                        }
                    }
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

    const columns = [
        {
            headerName: "ID",
            field: "id",
            width: 300,
            hide: true,
            align: "center",
            headerAlign: "center",
        },
        {
            headerName: "CRUD",
            field: "subtag",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            headerName: "SERVICES",
            field: "moduleName",
            flex: 1,
            align: "center",
            headerAlign: "center",
            hide: !isNonMobile,
        },
        {
            headerName: "NAME SPACE",
            field: "namespace",
            flex: 2,
            hide: !isNonMobile,
            headerAlign: "center",
        },
        {
            headerName: "FILE NAME",
            field: "fileName",
            flex: 1,
            hide: true,
            align: "center",
            headerAlign: "center",
        },
        {
            headerName: "Mapper ID",
            field: "xmlid",
            flex: 1,
            headerAlign: "center",
        },
        {
            field: "context",
            headerName: "XML MAPPER CONTEXT",
            flex: 5,
            hide: !isNonMobile,
            headerAlign: "center",
            sortable: false,
        },
        {
            headerName: "URL COUNT",
            field: "urlCount",
            align: "center",
            headerAlign: "center",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CREATED AT",
            align: "center",
            headerAlign: "center",
            hide: true,
            flex: 2,
        },
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
                    rows={(data && data?.listXmlModels?.items) || []}
                    columns={columns}
                    rowCount={(data && data?.listXmlModels?.items.length) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="client"
                    filterMode="client"
                    onFilterModelChange={(newModel) => {
                        setFilter(newModel);
                        console.log(newModel);
                    }}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    checkboxSelection={isNonMobile}
                    onRowClick={(params) => {
                        console.log("params =>> ", params);
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
