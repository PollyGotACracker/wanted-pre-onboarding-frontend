import useRedirection from "../../hooks/useRedirection";

const RedirectPageWapper = ({ state, requireAuth, redirectTo, children }) => {
  const isAuth = useRedirection({
    redirectIfAuth: !requireAuth,
    path: redirectTo,
    state: state,
  });

  if (requireAuth) return isAuth ? <>{children}</> : <></>;
  if (!requireAuth) return isAuth ? <></> : <>{children}</>;
};

export default RedirectPageWapper;
