import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const LegalPage = ({ title, description, sections }) => (
  <main className="page-surface">
    <Container className="py-5">
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <Row className="g-4">
        <Col lg={3}>
          <Card className="soft-card legal-toc">
            <Card.Body>
              <h2>Daftar Isi</h2>
              <Nav className="flex-column">
                {sections.map((section) => (
                  <Nav.Link
                    as={Button}
                    variant="link"
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                    key={section.id}
                  >
                    {section.title}
                  </Nav.Link>
                ))}
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Card className="soft-card legal-document">
            <Card.Body>
              {sections.map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </section>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

LegalPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LegalPage;
