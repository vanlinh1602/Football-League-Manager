import { Layout } from 'antd';
import Waiting from 'components/Waiting';
import Sider from 'features/Sider';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
const AboutUsPage = lazy(() => import('pages/AboutUs'));
function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Waiting />}>
        <Layout>
          <Sider />
          <Layout>
            <Layout.Content>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutUs" element={<AboutUsPage />} />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
