const NavButton = ({ className, onClick, icon, text }) => {
  const style = {
    color: "red",
  };

  return (
    <button className={className} onClick={onClick} style={style}>
      {icon}
      {text}
    </button>
  );
};

export default NavButton;
