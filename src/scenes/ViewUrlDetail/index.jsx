import {Box, Modal, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {randomId} from "@mui/x-data-grid-generator";

const ViewUrlDetail = ({open, onClose, data}) => {
  const theme = useTheme();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // 90%로 크기 조절
    maxHeight: '90vh', // 최대 높이를 화면 높이의 90%로 설정
    height: '80vh',
    overflowY: 'auto', // 내용이 모달보다 클 경우 스크롤 생성
    bgcolor: theme.palette.background.paper,
    // border: '2px solid #000',
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
  }

  const columns = [{
    field: 'className',
    headerName: '클래스명',
    flex: 1,
    // align: "center",
    // headerAlign: "center",
  }, {
    field: 'methodName',
    headerName: '메소드명',
    flex: 1,
    // align: "center",
    // headerAlign: "center",
  }, {
    field: 'url',
    headerName: 'URL',
    flex: 2
  }]

  return (
      <> {
          data && open &&
          <Modal open={open} onClose={onClose}>
            <Box sx={style}>
              <DataGrid
                  getRowId={() => randomId()}
                  rows={data ? JSON.parse(data?.methodModels) : []}
                  columns={columns}
                  autoPageSize={false}
                  checkboxSelection={false}
              />
            </Box>
          </Modal>
      }
      </>
  )
}

export default ViewUrlDetail
