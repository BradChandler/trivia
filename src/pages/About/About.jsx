import logo from "../../assets/trivia-logo.png";
import Actions from "../../components/Actions";
import Container from "../../components/Container";

const actionConfig = [{
  type: "link", 
  text: "Home", 
  link: "/", 
  name: "Return to home page"
}]
const aboutContent = [
  {
    heading: "Created By:", 
    content: <span>Brad Chandler</span>
  }, 
  {
    heading: "Designed By:", 
    content: <span>Brad Chandler</span>
  }, 
  {
    heading: "How To Play:", 
    content: <ol><li>Select your play mode from the home screen</li><li>Set rules for playing your game</li><li>Answer your questions to test your knowledge</li></ol>
  }, 
  {
    heading: "Questions Provided By:", 
    content: <span>Open Trivia Database</span>
  }
]

const About = () => {
  return ( 
    <section className="height__vh page-stack">
      <Actions config={actionConfig}/>
      <Container classNames="flex flex__col flex__left">
        <section className="grid__one grid__row-null">
          <img src={logo} width="240px" height="240px" alt="Trivia logo" />
          <section className="grid__one grid__row-md page-about--cards padding__md">
            {
              aboutContent.map((item, index) => (
                <div className="card grid__one grid__row-xs" key={index}>
                  <span className="text__bold">{item.heading}</span>
                  {item.content}
                </div>
              ))
            }
          </section>
        </section>
      </Container>
    </section>
  );
}
 
export default About;