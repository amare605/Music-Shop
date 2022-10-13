import { Container } from "react-bootstrap";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main className="py-2">
          <Container>
         
            <Routes>
              <Route path='/shipping' element={<ShippingScreen/>} /> 
              <Route path='/login' element={<LoginScreen/>} /> 
              <Route path='/register' element={<RegisterScreen/>} /> 
              <Route path='/profile' element={<ProfileScreen/>} /> 
              <Route path="/" element ={<HomeScreen/>}  />
              <Route path="/product/:id" element ={<ProductScreen/>}  />
              <Route path="/cart/" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen/>} />
            </Routes>
         
          </Container>
        </main>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
