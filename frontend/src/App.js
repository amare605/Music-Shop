import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="py-2">
        <Container>
          <h1>歡迎來到Music Shop</h1>  
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
