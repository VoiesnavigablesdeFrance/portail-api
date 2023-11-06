import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { shuffle } from 'lodash';
import { getAllAPIs, IApi } from '../model';
import Page from '../layouts/page';

import {
  UseCaseSection,
  ApiTripletSection,
  ExplanationSection,
  Baseline,
  DLNUFSection,
} from '../components/home';


interface IProps {
  apis: IApi[];
}

const Home: React.FC<IProps> = ({ apis }) => (
  <Page
    title="api.vnf.fr"
    canonical={`https://api.vnf.fr`}
    >
    <Baseline />
    <ExplanationSection />
    <ApiTripletSection apiList={apis} />

    <style jsx>{`
      h2 {
        margin: 100px 0 0;
      }
    `}</style>
  </Page>
);

export const getStaticProps: GetStaticProps = async () => {
  const apiList = await getAllAPIs();

  const mostInterestingApis = apiList
    .sort((a, b) => ((a.visits_2019 || 0) > (b.visits_2019 || 0) ? -1 : 1))
    .slice(0, 15);

  const refreshList = () => {
    return {
      apis: shuffle(mostInterestingApis).slice(0, 3),
    };
  };

  return {
    props: refreshList(),
  };
};

export default Home;
