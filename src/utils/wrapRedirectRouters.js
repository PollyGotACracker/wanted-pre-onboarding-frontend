import RedirectPageWapper from "../components/templates/RedirectPageWapper";

const wrapRedirectRouters = (routers) =>
  routers.map((router) => {
    if (router.authCheck) {
      return {
        path: router.path,
        element: (
          <RedirectPageWapper
            requireAuth={router.requireAuth}
            redirectTo={router.redirectTo}
            state={router?.state}
          >
            {router.element}
          </RedirectPageWapper>
        ),
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  });

export default wrapRedirectRouters;
