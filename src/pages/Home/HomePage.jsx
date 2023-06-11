import Background from "../../components/atoms/Background";
import Title from "../../components/atoms/Title";

const HomePage = () => {
  const main = ["MY", "TodoList"];
  const sub = ["wanted pre-onboarding frontend"];
  const titleDelay = 0.6;
  const backgoundDelay = [...main, ...sub].reduce(
    (acc, _, index) => index * 0.6 + acc,
    0
  );

  return (
    <Background type={"circle"} delay={backgoundDelay}>
      <Title main={main} sub={sub} delay={titleDelay} />
    </Background>
  );
};

export default HomePage;
