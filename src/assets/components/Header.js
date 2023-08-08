import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Image from "../images/logo.png";
import Profil from "../images/Profil.png";
import { bgColors } from '../../App';
import Cookie from 'universal-cookie';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        var cookie = new Cookie();
        cookie.remove('access_token');
        navigate('/');
      };

    return (
        <Navbar style={{ background: 'linear-gradient(to left, rgba(42, 152, 225, 0.7), rgba(167, 213, 243, 0.7))', height: 65 }} expand="lg">
            <Container style={{ maxWidth: "100%", display: "flex" }}>
                <img
                    alt="VR Stage Planner Logo"
                    src={Image}
                    width="50"
                    height="50"
                />
                <Navbar.Brand href="/" style={{ color: bgColors.Text, fontSize: "xx-large", textDecoration: 'none' }}>
                    Ankinator
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Dropdown align="end">
                        <Dropdown.Toggle
                            variant="link"
                            id="dropdown-basic"
                            style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                            <img alt="" src={Profil} style={{ marginRight: 5, marginLeft: 10, width: 55 }} className="d-inline-block align-top" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate('/history')}>History</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;