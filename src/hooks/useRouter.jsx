import { useLocation, useNavigate } from "react-router-dom";

const useRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return {
    currentPath: pathname,
    routeTo: (path) => navigate(path),
    replaceTo: (path, state = undefined) =>
      navigate(path, { replace: true, state: state }),
  };
};

export default useRouter;
