import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import { Fragment, Suspense, memo } from 'react';
import Header from './pages/layout/header';
import Footer from './pages/layout/footer';

function App() {
  console.log('App');
  return (
    <Fragment>
      <Header />
      <div className="main">
        <Suspense fallback={<div>Loading...</div>}>
          {useRoutes(routes)}
        </Suspense>
      </div>
      <Footer />
    </Fragment>
  );
}
export default memo(App);
// export default App;
