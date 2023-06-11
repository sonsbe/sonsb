import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mypage from './pages/MyPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Result from './pages/Result';
import Layout from './components/Layout/Layout';
import Layout2 from './components/Layout/Layout2';
import Search from './pages/Search';
import UserSelect from './pages/UserSelect';
import { SaveProvider } from "./contexts/SaveContext";
import { SaveItemContextProvider } from "./contexts/SaveItem";
import { SaveRecommendContextProvider} from './contexts/SaveRecommend';
import { ProductContextProvider } from "./contexts/Product";
import { AuthProvider } from './contexts/LoggedIn';

const App = () => {
  return (
    <AuthProvider>
    <SaveProvider>
      <SaveItemContextProvider>
        <SaveRecommendContextProvider>
          <ProductContextProvider>
            <Routes> 
              <Route element={<Layout2 />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/result" element={<Result />} />
                <Route path="/search" element={<Search />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/userselectitem" element={<UserSelect />} />
              </Route>
            </Routes>
          </ProductContextProvider>
        </SaveRecommendContextProvider>
      </SaveItemContextProvider>
    </SaveProvider>

    </AuthProvider>


  );
};

export default App;