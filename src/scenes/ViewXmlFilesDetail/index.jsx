import {Box, Modal, useTheme} from "@mui/material";
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

const ViewXmlFilesDetail = ({open, onClose, data}) => {
  const theme = useTheme();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // 90%로 크기 조절
    maxHeight: '90vh', // 최대 높이를 화면 높이의 90%로 설정
    overflowY: 'auto', // 내용이 모달보다 클 경우 스크롤 생성
    bgcolor: theme.palette.background.paper,
    // border: '2px solid #000',
    p: 2,
  }

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <SyntaxHighlighter language="sql" style={a11yDark}>
            {data && data.context}
          </SyntaxHighlighter>
        </Box>
      </Modal>
  )
}

export default ViewXmlFilesDetail
