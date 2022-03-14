const Icon = (props) => {
  const classes = "icon " + props.className;
  return (
    <div className={classes}>
      <i className={`fab fa-${props.i}`}></i>
    </div>
  );
};

export default Icon;
