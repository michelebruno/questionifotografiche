import React from 'react';
import { Link } from 'gatsby';
import gsap from 'gsap';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {
  const separe = React.useRef();
  const qf = React.useRef();

  React.useEffect(() => {
    gsap.to(separe.current, {
      width: '50vw',
      delay: 0.5,
      duration: 1,
    });
    // gsap.from(qf.current, {
    //   scale: 0,
    //   top: '100%',
    //   delay: 0.5,
    //   duration: 1,
    // });
  }, []);
  return (
    <Layout>
      <SEO title="Home" />
      <section className="row min-vh-100">
        <div className="col-12 text-center overflow-hidden">
          <h1 className="position-relative overflow-hidden">
            <span
              className="  overflow-hidden"
              style={{
                fontSize: '90vh',
                lineHeight: 0.9,
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
                top: '40%',
                left: '25%',
                fontSize: '8vw',
                zIndex: -1,
              }}
            >
              questioni
              <br />
              fotografiche
            </span>
          </h1>
        </div>
      </section>
      <div className="row no-gutters border-dark border-top border-bottom">
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
      <section className="row">
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
        <div className="col-12 col-md-4 offset-md-8">
          <p className="py-5 ">
            Il percorso vuole creare un’occasione per riscoprire, come De
            Maistre
            nel suo “Voyage autour de ma chambre”, i piccoli infiniti che si
            nascondono, ma si possono rivelare e rendere oggetto di narrazione
            visiva, in una scala di paesaggio domestico.
            Un paesaggio ricco di affetti e di storie come scrive anche Vittorio
            Lingiardi nel suo “Mindscapes” o come illustra Luigi Ghirri nel suo
            lavoro “Identikit”.
          </p>
        </div>
      </section>
      <section className="row align-items-center" style={{ minHeight: '50vh' }}>
        <div className="col-12 text-center py-5">
          <h3 className="display-2">
            <Link to="/alfabeto">Scopri le foto</Link>
          </h3>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
