import React from 'react';
import Marquee from 'react-fast-marquee';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="row vh-100">
      <div className="col-12 text-center">
        <span className="h1" style={{ fontSize: '40rem' }}>26</span>
      </div>
    </section>
    <div className="row no-gutters border-top border-bottom">
      <div className="col-12">
        <div>
          <marquee>
            <h3 className="d-inline-block">come le lettere dell'alfabeto / </h3>
          </marquee>
        </div>
      </div>

    </div>
    <section className="row">
      <div className="col-12 col-md-9 pb-5 my-5">
        <p className="display-4">
          Questo progetto nasce
          dall’idea di condividere con allievi di diverse estrazioni e
          provenienze, oltre che con alcuni colleghi, amici e maestri nel campo
          della fotografia,
          della filosofia e della scrittura,
          una proposta di percorso didattico, frutto delle
          esperienze di insegnamento
          in questi ultimi anni.
        </p>
      </div>
      <div className="col-12 col-md-4 offset-md-8">
        <p className="py-5">
          Il percorso vuole creare un’occasione per riscoprire, come De Maistre
          nel suo “Voyage autour de ma chambre”, i piccoli infiniti che si
          nascondono, ma si possono rivelare e rendere oggetto di narrazione
          visiva, in una scala di paesaggio domestico.
          Un paesaggio ricco di affetti e di storie come scrive anche Vittorio
          Lingiardi nel suo “Mindscapes” o come illustra Luigi Ghirri nel suo
          lavoro “Identikit”.
        </p>
      </div>
    </section>
    <section className="row">
      <div className="col-12 text-center py-5">
        <h3>Scopri le foto</h3>
      </div>
    </section>
  </Layout>
);

export default IndexPage;
