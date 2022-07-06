
const Container = ({ children, classNames }) => {
  return ( 
    <section className={ `container ${classNames}`}>
      {children}
    </section>
  );
}
 
export default Container;