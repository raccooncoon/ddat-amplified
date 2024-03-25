import {styled} from "@mui/system";
import {Box, useMediaQuery, useTheme} from "@mui/material";
import {CloudUploadOutlined} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {useEffect, useState} from "react";
import axios from "axios";
import UseCurrentAuthenticatedUser
  from "../hooks/useCurrentAuthenticatedUser.jsx";

function UploadXmlFiles() {
  const theme = useTheme();
  const [datas, setDatas] = useState([]);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { email } = UseCurrentAuthenticatedUser();
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
    const fetchData = async () => {
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        try {
          await axios.post('http://localhost:8080/api/xml_file/contexts/', {
            moduleName: data.moduleName,
            xmlid: data.xmlid,
            namespace: data.namespace,
            subtag: data.subtag,
            fileName: data.fileName,
            context: data.context,
            urlCount: data.urlCount,
            methodModels: JSON.stringify(data.methodModels)
          });
          console.log(`Data ${i + 1} uploaded successfully.`);
        } catch (error) {
          console.error(`Error uploading data ${i + 1}:`, error);
        }
        // 0.001초마다 데이터 전송
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    };
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
                   disabled={!isNonMobile || email !== "kid1401@gmail.com"}
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

export default UploadXmlFiles;
