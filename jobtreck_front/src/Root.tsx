import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/components';
import useTreeChanges from 'tree-changes-hook';

import { name } from '~/config';

import { useAppSelector } from '~/modules/hooks';
import theme, { headerHeight } from '~/modules/theme';

import { alertShow } from '~/actions';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import PrivateRoute from '~/components/PrivateRoute';
import PublicRoute from '~/components/PublicRoute';
import SystemAlerts from '~/containers/SystemAlerts';
import SearchMain from '~/components/SearchMain';
import ViewJob from './components/ViewJob';
import CreateJoB from './components/CreateJob'

import Home from '~/routes/Home';
import NotFound from '~/routes/NotFound';
import Private from '~/routes/Private';

import { selectUser } from '~/selectors';
import { UserState } from '~/types';
import Register from '~/components/Register';
import LoginPage from '~/components/LoginPage';
import DashBoard from './components/DashBoard';
import { ToastContainer, toast } from 'react-toastify';
import HeaderLogout from './components/HeaderLogout';
import HomepageOur from './components/HomepageOur';
import DashboardJobCounts from './components/DashboardJobCounts';
import Applications from './components/Applications';
import AdminDashBoard from './components/AdminDashbaord/AdminDashboard';
import JobDetails from '../src/components/JobDetails';
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main<Pick<UserState, 'isAuthenticated'>>`
  min-height: 100vh;
  padding: 0;
`;

function Root() {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const { changed } = useTreeChanges(user);

  const { isAuthenticated, userDetails } = user;

  // console.log(userDetails.user_role, "role");
  


  useEffect(() => {
    if (changed('isAuthenticated', true)) {
      dispatch(alertShow('Hello! And welcome!', { type: 'success', icon: 'bell', timeout: 10 }));
    }
  }, [dispatch, changed]);



  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <AppWrapper data-component-name="app">


          <Header isAuthenticated={isAuthenticated}  userDetails={userDetails} />
          <Main isAuthenticated={isAuthenticated}>
            <Routes>
              <Route
                path="/Home"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} to="/login">
                    <HomepageOur />
                  </PrivateRoute>
                }
              />

              <Route element={<Register />} path="/register" />
              <Route
                path="/login"
                element={
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <LoginPage />
                  </PublicRoute>
                } />

              <Route path="/dashboard" element={
                <PrivateRoute isAuthenticated={isAuthenticated} to="/login">
                  <DashBoard userDetails={userDetails} />
                </PrivateRoute>
              }>
                <Route
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated} to="/" >
                      <ViewJob />
                    </PrivateRoute>
                  } path='/dashboard/viewjob' />
                <Route
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated} to="/" >
                      <Applications />
                    </PrivateRoute>
                  } path='/dashboard/applications' />

              </Route>
            
              <Route element={<NotFound />} path="*" />

             
              <Route element={<CreateJoB />} path='/createJob' />

              <Route element={<HomepageOur />} path='/' />
              <Route path="/jobdetails/:jobId" element={<JobDetails />} />

            </Routes>
          </Main>
          <Footer />
          <SystemAlerts />
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Root;

