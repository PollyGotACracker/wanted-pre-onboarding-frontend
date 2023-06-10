import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="status">404</div>
      <h1>Not Found</h1>
      <p>요청한 URL 페이지를 찾을 수 없습니다.</p>
    </main>
  );
};

export default NotFound;
