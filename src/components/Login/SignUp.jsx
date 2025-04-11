import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import logoIcon from "../../assets/images/logo.png";
import "../../css/Login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
 
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    axios
      .post(`${apiUrl}/register`, { name, email, password })
      .then((result) => {
        setLoading(false);
        console.log(result);
        sessionStorage.setItem("userName", name);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message || "Network error or server is down");
      });
  };

  return (
    <div className="loginCenter">
      <Card className="login_box">
        <Card.Body>
          <Card.Title className="text-center">
            <div className="title_logo">
              <span>
                <img src={logoIcon} alt="Logo" className="img-fluid" />
              </span>
            </div>
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </Form.Group>

            <div className="text-end mt-4">
              <Button variant="primary" type="submit" className="btnColor" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
