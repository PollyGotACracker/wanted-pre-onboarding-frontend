import "./ListContainer.css";
import { memo, createRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListContainer = memo(({ data, id, render }) => {
  // props 로 render 를 받은 후 호출하면 react element 반환
  // render={(props) => <TodoItem item={props} />}
  const items = useMemo(() => {
    // item 을 wrapping 하여 ref 지정하지 않으면 오류 발생
    return data.map((item) => {
      const nodeRef = createRef(null);
      return (
        <CSSTransition
          key={item[id]}
          nodeRef={nodeRef}
          timeout={500}
          classNames="item"
        >
          <div className="item" ref={nodeRef}>
            {render(item)}
          </div>
        </CSSTransition>
      );
    });
  }, [data, id, render]);

  return (
    <div className="list">
      <TransitionGroup>{items}</TransitionGroup>
    </div>
  );
});

export default ListContainer;
