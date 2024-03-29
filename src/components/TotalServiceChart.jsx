import {ResponsivePie} from "@nivo/pie";
import {Box, CircularProgress, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import UseCurrentAuthenticatedUser
  from "../hooks/useCurrentAuthenticatedUser.jsx";
import {del, get} from 'aws-amplify/api';

const baseUrl = import.meta.env.VITE_BASE_URL || "";

const TotalServiceChart = ({isDashboard = false}) => {
  const theme = useTheme();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);
  const {email} = UseCurrentAuthenticatedUser();

  useEffect(() => {
    const getXmlFiles = () => {
      get({
        apiName: 'apiff18fc31',
        path: '/api/xml_file/total_context/'
      }).then((response) => {
        setData(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
    }
    getXmlFiles()
  }, []);

  const colors = [
    theme.palette.secondary[100],
    theme.palette.secondary[200],
    theme.palette.secondary[300],
    theme.palette.secondary[400],
    theme.palette.secondary[500],
    theme.palette.secondary[600],
    theme.palette.secondary[600],
    theme.palette.primary[100],
    theme.palette.primary[200],
    theme.palette.primary[300],
    theme.palette.primary[400],
    theme.palette.primary[500],
    theme.palette.primary[600],
    theme.palette.primary[600],
  ];

  const formattedData = Object.entries(data).map(
      ([category, value], i) => ({
        id: category,
        label: category,
        value: value,
        color: colors[i],
      })
  );

  return (
      <Box
          height={isDashboard ? "400px" : "100%"}
          width={undefined}
          minHeight={isDashboard ? "325px" : undefined}
          minWidth={isDashboard ? "325px" : undefined}
          position="relative"
      >
        <ResponsivePie
            data={formattedData}
            onClick={(none) => {
              if (email !== "kid1401@gmail.com") {
                return;
              }

              if (confirm(
                  `${none.id} 모듈 관련 정보 ${none.value} 개를 전부 삭제 하시 겠 습니까?`)) {
                del({
                  apiName: 'apiff18fc31',
                  path: `/api/xml_file/contexts/${none.id}`,
                }).then(() => {
                  setIsLoading(false);
                  window.location.reload();
                })
                .catch((error) => {
                  console.error(error);
                  setIsLoading(false);
                });
              }
            }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{datum: "data.color"}}
            margin={
              isDashboard
                  ? {top: 40, right: 80, bottom: 100, left: 50}
                  : {top: 40, right: 80, bottom: 80, left: 80}
            }
            sortByValue={true}
            innerRadius={0.45}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={!isDashboard}
            arcLinkLabelsTextColor={theme.palette.secondary[200]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{from: "color"}}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: isDashboard ? 20 : 0,
                translateY: isDashboard ? 50 : 56,
                itemsSpacing: 0,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.primary[500],
                    },
                  },
                ],
              },
            ]}
        />
        <Box
            position="absolute"
            top="50%"
            left="50%"
            color={theme.palette.secondary[400]}
            textAlign="center"
            pointerEvents="none"
            sx={{
              transform: isDashboard
                  ? "translate(-75%, -170%)"
                  : "translate(-50%, -100%)",
            }}
        >
          {isLoading ? <CircularProgress/> :
              <Typography variant="h6">
                {!isDashboard && "Total : "}{total}
              </Typography>
          }
        </Box>
      </Box>
  );
};

export default TotalServiceChart;
