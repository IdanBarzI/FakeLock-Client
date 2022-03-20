const Icon = (props) => {
  const classes = "icon " + props.className;
  return (
    <div className={classes}>
      <i className={`${props.i}`}></i>
    </div>
  );
};

export default Icon;
