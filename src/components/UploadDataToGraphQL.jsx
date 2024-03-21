import {styled} from "@mui/system";
import {Box, useTheme} from "@mui/material";
import {CloudUploadOutlined} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {generateClient} from 'aws-amplify/api';
import {useState} from "react";
import {createXmlModel} from "../graphql/mutations.js";

function UploadDataToGraphQL() {
    const theme = useTheme();
    // const [selectedFile, setSelectedFile] = useState(null); // 파일 상태를 저장하는 selectedFile state를 추가합니다.
    const [loading, setLoading] = useState(false);
    const client = generateClient(); // AWS Amplify API 클라이언트를 생성합니다.
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // setSelectedFile(file);

        // 파일을 읽기 위한 FileReader 객체 생성
        const reader = new FileReader();

        // 파일 읽기가 완료되면 실행될 콜백 함수 정의
        reader.onload = (e) => {

            const content = JSON.parse(e.target.result);
            setLoading(true); // 파일 업로드가 시작되면 로딩 상태를 true로 설정합니다.
            alert('Uploading ' + content.length + ' records')
            // 시작숫자 마지막숫자 입력 받기, 기본값 설정
            let start = parseInt(prompt('시작숫자를 입력하세요', 0));
            let end = parseInt(prompt('마지막숫자를 입력하세요', content.length));
            content.slice(start, end).forEach(data => {
                // content.forEach(data => {
                setTimeout(() => {
                    sendToGraphQL(data);
                }, 1000);
            });
            setLoading(false);
        };
        // 파일을 텍스트로 읽기
        reader.readAsText(file);
    };

    const sendToGraphQL = async (data) => {
        // console.table(data)
        try {
            const response = await client.graphql({
                query: createXmlModel, variables: {
                    input: {
                        moduleName: data.moduleName,
                        xmlid: data.xmlid,
                        namespace: data.namespace,
                        subtag: data.subtag,
                        fileName: data.fileName,
                        context: data.context,
                        urlCount: data.urlCount,
                        MethodModels: data.methodModels
                    },
                },
            })
            console.log('GraphQL response:', response);
            // 그래프큐엘 서버로부터 받은 응답을 처리하는 로직을 추가할 수 있습니다.
        } catch (error) {
            console.error('Error sending query to GraphQL:', error);
            // 오류 발생 시 처리하는 로직을 추가할 수 있습니다.
        }
    };

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
        <LoadingButton loading={loading}
                       component="label"
                       role={undefined}
                       variant="contained"
                       tabIndex={-1}
                       startIcon={<CloudUploadOutlined/>}
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
