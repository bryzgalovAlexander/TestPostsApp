import 'bootstrap/dist/css/bootstrap.min.css';
import {NavbarApp} from "./components/NavbarApp";
import {Posts} from "./components/Posts";
import {AboutMe} from "./components/AboutMe";
import {Route, Routes} from "react-router";
import {Container} from "react-bootstrap";
import {Info} from "./components/Info";

export const App = () => {
  return (
      <Container>
        <NavbarApp/>
        <Routes>
          <Route exact path={'/about_me'} element={<AboutMe/>}/>
          <Route exact path={'/'} element={<Posts/>}/>
          <Route exact path={'/info'} element={<Info/>}/>
        </Routes>
      </Container>
  );
}


