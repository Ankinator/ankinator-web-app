import { Col, Container, Nav, Navbar, Row, Button } from 'react-bootstrap';
import Image from "../../../assets/images/logo.png";
import Profil from "../../../assets/images/Profil.svg";
import { bgColors } from '../../../App';

function Header() {
    return (
        <Navbar style={{ background: 'linear-gradient(to left, rgba(42, 152, 225, 0.7), rgba(167, 213, 243, 0.7))' }} sticky="top" expand="lg">
            <Container style={{ maxWidth: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <img
                    alt="VR Stage Planner Logo"
                    src={Image}
                    width="50"
                    height="50"
                />
                <Navbar.Brand href="#Home" style={{ color: bgColors.Text, fontSize: "xx-large", textDecoration: 'none' }}>

                    Ankinator
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Button style={{ backgroundColor: 'transparent', borderColor: "transparent" }} onClick="test"><img alt="" src={Profil} style={{ marginRight: 5, marginLeft: 10 }} className="d-inline-block align-top" /></Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;