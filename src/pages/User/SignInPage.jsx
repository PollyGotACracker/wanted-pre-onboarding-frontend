import { useLocation } from "react-router-dom";
import SignForm from "../../components/templates/UserForm";
import Title from "../../components/atoms/Title";

const SignInPage = () => {
  const location = useLocation();

  return (
    <main className="signIn">
      <Title text={"Sign In"} />
      <div>{location?.state?.message || ""}</div>
      <SignForm />
    </main>
  );
};
export default SignInPage;
