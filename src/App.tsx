import { Layout } from 'antd';
import AuthorizedRoute from 'AuthorizedRoute';
import { Header } from 'components';
import Waiting from 'components/Waiting';
import Sider from 'features/Sider';
import { useTeamSlide } from 'features/teams/store';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
const TeamsPage = lazy(() => import('pages/Teams'));
const LeaguesPage = lazy(() => import('pages/Leagues'));
const PlayersPage = lazy(() => import('pages/Players'));
function App() {
  const dispatch = useDispatch();
  const { actions } = useTeamSlide();

  useEffect(() => {
    dispatch(actions.getTeams());
  }, [dispatch, actions]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Waiting />}>
        <Layout>
          <Sider />
          <Layout>
            <Header />
            <Layout.Content>
              <Routes>
                <Route path="/" element={<AuthorizedRoute />}>
                  <Route path="" element={<HomePage />} />
                </Route>
                <Route path="/leagues" element={<AuthorizedRoute />}>
                  <Route path="" element={<LeaguesPage />} />
                </Route>
                <Route path="/teams" element={<AuthorizedRoute />}>
                  <Route path="" element={<TeamsPage />} />
                </Route>
                <Route path="/players" element={<AuthorizedRoute />}>
                  <Route path=":team" element={<PlayersPage />} />
                  <Route path="" element={<PlayersPage />} />
                </Route>
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
