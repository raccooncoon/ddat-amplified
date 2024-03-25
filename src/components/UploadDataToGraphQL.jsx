import {styled} from "@mui/system";
import {Box, useTheme} from "@mui/material";
import {CloudUploadOutlined} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {useEffect, useState} from "react";
import axios from "axios";

function UploadDataToGraphQL() {
  const theme = useTheme();
  const [datas, setDatas] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = JSON.parse(e.target.result);
      alert('Uploading ' + content.length + ' records')
      // 시작숫자 마지막숫자 입력 받기, 기본값 설정
      let start = parseInt(prompt('시작숫자를 입력하세요', 0));
      let end = parseInt(prompt('마지막숫자를 입력하세요', content.length));
      setDatas(content.slice(start, end));
    };
    // 파일을 텍스트로 읽기
    reader.readAsText(file);
  };

  useEffect(() => {
    async function fetchData() {
      for (const data of datas) {
        await axios.post('http://localhost:8080/api/xml_file/context/', {
          moduleName: data.moduleName,
          xmlid: data.xmlid,
          namespace: data.namespace,
          subtag: data.subtag,
          fileName: data.fileName,
          context: data.context,
          urlCount: data.urlCount,
          MethodModels: JSON.stringify(data.methodModels)
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
    fetchData();
  }, [datas]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (<Box>
    <LoadingButton loading={false}
                   component="label"
                   role={undefined}
                   variant="contained"
                   tabIndex={-1}
                   startIcon={<CloudUploadOutlined/>}
                   disabled={false}
                   sx={{
                     backgroundColor: theme.palette.secondary.light,
                     color: theme.palette.background.alt,
                     fontWeight: "bold",
                     ":hover": {
                       backgroundColor: theme.palette.secondary.dark,
                     }
                   }}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
    </LoadingButton>
  </Box>);
}

export default UploadDataToGraphQL;
