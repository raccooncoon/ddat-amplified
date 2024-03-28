import {useSelector} from "react-redux";
import {useMemo} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {themeSettings} from "./theme.js";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./scenes/layout/index.jsx";
import XmlFiles from "./scenes/XmlFiles/index.jsx";
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {QueryClient, QueryClientProvider} from "react-query";
import TotalServices from "./scenes/TotalServices/index.jsx";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const queryClient = new QueryClient();
  return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Routes>
                <Route element={<Layout/>}>
                  <Route path="/" element={<Navigate to="/xmlFiles" replace/>}/>
                  <Route path="/xmlFiles" element={<XmlFiles/>}/>
                  <Route path="/TotalServices" element={<TotalServices />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </div>
  )
}

export default withAuthenticator(App)
