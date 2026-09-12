import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Col, Container, Modal, Nav, Row, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";
import "./Projects.css";
import { Helmet } from "react-helmet-async";

const externalLinkProps = { target: "_blank", rel: "noreferrer" };
const variantShape = PropTypes.shape({
  stack: PropTypes.string.isRequired,
  link: PropTypes.string,
  github: PropTypes.string,
});
const projectShape = PropTypes.shape({
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string),
  featured: PropTypes.bool,
  link: PropTypes.string,
  github: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  variants: PropTypes.arrayOf(variantShape),
  screenshots: PropTypes.arrayOf(PropTypes.string),
});

const ProjectActions = ({ project }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const hasScreenshots = project.screenshots?.length > 0;

  const openGallery = () => {
    setActiveScreenshot(0);
    setShowGallery(true);
  };

  return (
    <>
      <div className="project-actions d-flex flex-wrap gap-2 mt-auto pt-3">
        {project.variants?.length > 0 ? (
          <div className="variant-list d-flex flex-wrap gap-2">
            {project.variants.map((variant) => (
              <div className="variant-item d-flex align-items-center" key={variant.stack}>
                <a className="badge text-bg-light border rounded-end-0" href={variant.link} {...externalLinkProps}>
                  {variant.stack}
                </a>
                {variant.github && (
                  <a
                    className="btn btn-sm btn-dark rounded-start-0 variant-github"
                    href={variant.github}
                    aria-label={`View ${variant.stack} source code on GitHub`}
                    {...externalLinkProps}
                  >
                    <FaGithub aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {project.link && <Button variant="primary" href={project.link} {...externalLinkProps}>Live Preview</Button>}
            {project.github && (
              <Button variant="dark" href={project.github} {...externalLinkProps}>
                <FaGithub className="me-2" aria-hidden="true" />GitHub
              </Button>
            )}
            {hasScreenshots && <Button variant="outline-dark" onClick={openGallery}>View Screenshots</Button>}
          </>
        )}
      </div>

      {hasScreenshots && (
        <Modal show={showGallery} onHide={() => setShowGallery(false)} centered size="lg">
          <Modal.Header closeButton><Modal.Title>{project.title} screenshots</Modal.Title></Modal.Header>
          <Modal.Body>
            <img
              className="gallery-main-image"
              src={project.screenshots[activeScreenshot]}
              alt={`${project.title} screenshot ${activeScreenshot + 1}`}
            />
            <div className="gallery-thumbnails d-flex flex-row gap-2 mt-3 overflow-auto">
              {project.screenshots.map((screenshot, index) => (
                <button
                  className={`gallery-thumbnail ${activeScreenshot === index ? "active" : ""}`}
                  type="button"
                  key={screenshot}
                  onClick={() => setActiveScreenshot(index)}
                  aria-label={`Show screenshot ${index + 1}`}
                >
                  <img src={screenshot} alt="" />
                </button>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

const ProjectCard = ({ project, featured = false }) => (
  <Card className={`project-card h-100 ${featured ? "featured-card" : ""}`}>
    <Card.Img variant="top" src={project.imageSrc} alt={project.title} />
    <Card.Body className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
        <Card.Title className="mb-0">{project.title}</Card.Title>
        <Badge bg="warning" text="dark">{project.category}</Badge>
      </div>
      <Card.Text>{project.description}</Card.Text>
      {!project.variants && project.technologies?.length > 0 && (
        <div className="technology-list d-flex flex-wrap gap-2" aria-label="Technologies used">
          {project.technologies.map((technology) => <Badge bg="secondary" key={technology}>{technology}</Badge>)}
        </div>
      )}
      <ProjectActions project={project} />
    </Card.Body>
  </Card>
);

ProjectActions.propTypes = { project: projectShape.isRequired };
ProjectCard.propTypes = {
  project: projectShape.isRequired,
  featured: PropTypes.bool,
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Amine-Triki/projects-data/main/projects.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(projects.map((project) => project.category))],
    [projects]
  );
  const featuredProjects = projects.filter((project) => project.featured === true);
  const otherProjects = projects.filter((project) => project.featured !== true);
  const filteredProjects = otherProjects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  if (loading) {
    return <div className="projects-state"><Spinner animation="border" variant="primary" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>;
  }

  return (
    <main>
      <Helmet>
        <title>My Projects</title>
        <link rel="icon" type="image/png" href="../../assets/logo.webp"></link>
      </Helmet>
      <section className="projects-page py-5">
        <Container>
          <header className="projects-heading text-center mb-5">
            <h1>My Projects</h1>
            <p className="lead mb-0">What I build</p>
          </header>

          {error ? (
            <p className="text-center text-danger">Projects could not be loaded right now.</p>
          ) : (
            <>
              {featuredProjects.length > 0 && (
                <section className="mb-5" aria-labelledby="featured-projects-heading">
                  <h2 id="featured-projects-heading" className="section-heading">Featured Projects</h2>
                  <Row className="g-4">
                    {featuredProjects.map((project) => <Col key={project.title} xs={12} md={6} xl={4}><ProjectCard project={project} featured /></Col>)}
                  </Row>
                </section>
              )}

              <section aria-labelledby="all-projects-heading">
                <h2 id="all-projects-heading" className="section-heading">All Projects</h2>
                <Nav variant="pills" className="project-filters mb-4 gap-2" activeKey={activeCategory}>
                  {categories.map((category) => (
                    <Nav.Item key={category}>
                      <Nav.Link eventKey={category} onClick={() => setActiveCategory(category)}>{category === "all" ? "All" : category}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <Row className="g-4">
                  {filteredProjects.map((project) => <Col key={project.title} xs={12} sm={6} lg={4}><ProjectCard project={project} /></Col>)}
                </Row>
                {filteredProjects.length === 0 && <p className="text-center py-4">No projects in this category.</p>}
              </section>
            </>
          )}
        </Container>
      </section>
    </main>
  );
};

export default Projects;
