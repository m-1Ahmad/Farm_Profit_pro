import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function VerifyEmail() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/verify-email/${uid}/${token}/`)
      .then((res) => {
        setMessage(res.data.message);
        logout();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setMessage("Verification failed.");
      });
  }, [uid, token, navigate]);

  return <div style={{ padding: "2rem" }}>{message}</div>;
}

export default VerifyEmail;