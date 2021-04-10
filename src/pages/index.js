import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import _ from 'lodash';
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
  </Layout>
);

export default IndexPage;
