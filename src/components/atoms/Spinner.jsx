import PuffLoader from "react-spinners/PuffLoader";

const Spinner = ({ size, color }) => {
  return (
    <PuffLoader
      color={color}
      // cssOverride={}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;

Spinner.defaultProps = {
  size: 150,
  color: getComputedStyle(document.documentElement).getPropertyValue(
    "--primary"
  ),
};
