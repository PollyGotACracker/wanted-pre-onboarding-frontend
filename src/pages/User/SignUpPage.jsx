import SignForm from "../../components/templates/UserForm";
import Title from "../../components/atoms/Title";

const SignUpPage = () => {
  return (
    <main className="signUp">
      <Title text={"Sign Up"} />
      <SignForm />
    </main>
  );
};
export default SignUpPage;
