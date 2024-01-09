import { Layout } from 'antd';
import AuthorizedRoute from 'AuthorizedRoute';
import Waiting from 'components/Waiting';
import Sider from 'features/Sider';
import { useTeamSlide } from 'features/teams/store';
import { useUserSlice } from 'features/user/store';
import { selectUserId } from 'features/user/store/selectors';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
const TeamsPage = lazy(() => import('pages/Teams'));
const LeaguesPage = lazy(() => import('pages/Leagues'));
const PlayersPage = lazy(() => import('pages/Players'));
const MatchesPage = lazy(() => import('pages/Matchs'));
const EventsPage = lazy(() => import('pages/Events'));
const LoginPage = lazy(() => import('pages/Login'));
function App() {
  const dispatch = useDispatch();
  const { actions } = useTeamSlide();
  const { actions: userActions } = useUserSlice();
  const useId = useSelector(selectUserId);
  useEffect(() => {
    dispatch(actions.getTeams());
  }, [dispatch, actions]);

  useEffect(
    () =>
      onAuthStateChanged(getAuth(), (user: User) => {
        if (user) {
          dispatch(userActions.signIn(user));
        }
      }),
    [userActions, dispatch]
  );

  return (
    <BrowserRouter
      basename={process.env.REACT_APP_STAGE === 'development' ? '' : '/Football-League-Manager'}
    >
      <Suspense fallback={<Waiting />}>
        <Layout>
          {useId ? <Sider /> : null}
          <Layout>
            <Layout.Content>
              <Routes>
                <Route path="/" element={<AuthorizedRoute />}>
                  <Route path="" element={<HomePage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
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
                <Route path="/matches" element={<AuthorizedRoute />}>
                  <Route path=":league" element={<MatchesPage />} />
                  <Route path=":league/:match/events" element={<EventsPage />} />
                  <Route path="" element={<MatchesPage />} />
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
