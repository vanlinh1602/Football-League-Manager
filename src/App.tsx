import { Layout } from 'antd';
import { Header } from 'components';
import Waiting from 'components/Waiting';
import Sider from 'features/Sider';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
const TeamsPage = lazy(() => import('pages/Teams'));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Waiting />}>
        <Layout>
          <Sider />
          <Layout>
            <Header />
            <Layout.Content>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/teams" element={<TeamsPage />} />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
