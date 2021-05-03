import React from 'react';
import { graphql, Link } from 'gatsby';
import gsap from 'gsap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  const images = data.images.nodes.filter((img) => img.childImageSharp.gatsbyImageData.height == (2 / 3));
  const [image, setImage] = React.useState(() => _.sample(images));

  const separe = React.useRef();
  const qf = React.useRef();

  React.useEffect(() => {
    gsap.to(separe.current, {
      width: '50vw',
      delay: 0.5,
      duration: 1,
    });
    gsap.from(qf.current, {
      opacity: 0,
      delay: 0.5,
      duration: 0.1,
    });

    const interval = setInterval(() => setImage(_.sample(images)), 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Layout>
      <SEO title="Home" />
      <section className="container-fluid">
        <div className="row">
          <div className="col-12 text-center overflow-hidden">
            <h1 className="position-relative overflow-hidden  min-vh-100">
              <span
                className="  overflow-hidden"
                style={{
                  fontSize: '40vw',
                  lineHeight: 1,
                  wordBreak: 'keep-all',
                }}
              >
                <span className="bg-white">2</span>
                <span className="d-inline-block" ref={separe} />
                <span className="bg-white">6</span>
              </span>
              <span
                ref={qf}
                className="position-absolute w-50 "
                style={{
                  top: '12vw',
                  left: '25%',
                  fontSize: '8vw',
                  zIndex: -1,
                }}
              >
                <div className="w-100 text-left" style={{ fontFamily: 'var(--font-family-sans-serif)' }}>
                  questioni
                </div>
                <div className="text-right">
                  fotografiche

                </div>
              </span>
            </h1>
          </div>
        </div>
        {' '}
        <div className="row border-dark border-top border-bottom">
          <div className="col-12">
            <div className="d-block">
              <div className="marquee">
                <div className="marquee__inner" aria-hidden="true">
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                  <span>come le lettere dell'alfabeto / </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
      <section className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-12 col-md-9 pb-5 my-5">
            <p className="display-2">
              Questo progetto nasce
              dall’idea di condividere con allievi di diverse estrazioni e
              provenienze, oltre che con alcuni colleghi, amici e maestri nel
              campo
              della fotografia,
              della filosofia e della scrittura,
              una proposta di percorso didattico, frutto delle
              esperienze di insegnamento
              in questi ultimi anni.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <GatsbyImage image={getImage(image)} />
          </div>
          <div className="col-12 col-md-4 ">
            <p className="py-5 ">
              Il percorso vuole creare un’occasione per riscoprire, come De
              Maistre
              nel suo “Voyage autour de ma chambre”, i piccoli infiniti che si
              nascondono, ma si possono rivelare e rendere oggetto di narrazione
              visiva, in una scala di paesaggio domestico.
              Un paesaggio ricco di affetti e di storie come scrive anche
              Vittorio
              Lingiardi nel suo “Mindscapes” o come illustra Luigi Ghirri nel
              suo
              lavoro “Identikit”.
            </p>
          </div>
        </div>
        <div className="row align-items-center" style={{ minHeight: '50vh' }}>
          <div className="col-12 text-center py-5">
            <h3 className="display-2">
              <Link to="/alfabeto">Scopri le foto</Link>
            </h3>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`{
  images: allFile(
    filter: {sourceInstanceName: {eq: "fotografie"}}
    sort: {fields: id}
    limit:40
  ) {
    nodes {
      publicURL
      relativePath
      childImageSharp {
        gatsbyImageData( 
          layout: FULL_WIDTH
          quality: 90
        )
      }
      sourceInstanceName
      size
    }
  }
}`;
