import SignForm from "./SignForm";
import { useLocation } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();

  return (
    <main className="signIn">
      <div>SignIn</div>
      <div>{location?.state?.message || ""}</div>
      <SignForm />
    </main>
  );
};
export default SignIn;
