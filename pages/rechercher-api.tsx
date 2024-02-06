import React from 'react';
import { flatten, uniq } from 'lodash';
import { GetServerSideProps, GetStaticProps } from 'next';

import { getAllAPIs, IApi } from '../model';
import Page from '../layouts/page';
import SearchApis from '../components/searchApis';
import { HEADER_PAGE } from '../components';
import constants from '../constants';
import { filterExceptions } from '../components/searchApis/filtersLogic';

interface IProps {
  allApis: IApi[];
  allThemes: string[];
}

const RechercherApi: React.FC<IProps> = ({ allApis, allThemes }) => {
  return (
    <Page
      headerKey={HEADER_PAGE.APIS}
      preFooterBackground={constants.colors.white}
      title="Rechercher une API de VNF"
      description="Vous cherchez une API de VNF ? Vous êtes au bon endroit."
    >
      <section className="fr-container page-baseline">
        <h1>
          Vous recherchez une API de VNF ? Vous êtes au bon endroit !
        </h1>
      </section>

      <SearchApis allApis={allApis} allThemes={allThemes} />
    </Page>
  );
};

export async function getStaticProps() {
  try {
    const allApis = await getAllAPIs();

    const allThemes = uniq(
      flatten(
        allApis.map(api => {
          if (!api.themes) {
            throw new Error(`API must have at least one theme : ${api.slug}`);
          }
          return api.themes;
        })
      )
    ).sort();

    //console.log('allApis:', allApis);
    //console.log('allThemes:', allThemes);

    return {
      props: {
        allApis,
        allThemes,
      },
    };
  } catch (error: any) {
    console.error('Error in getStaticProps:', error.message);
    return {
      props: {
        allApis: [],
        allThemes: [],
      },
    };
  }
}


  /*export const getServerSideProps: GetServerSideProps<IProps> = async () => {
    const allApis = await getAllAPIs();
  
    const allThemes = uniq(
      flatten(
        allApis.map(api => {
          if (!api.themes) {
            throw new Error(`API must have at least one theme : ${api.slug}`);
          }
          return api.themes;
        })
      )
    ).sort();
  
    const sortedAllApis = allApis.sort((a, b) =>
      (a.visits_2019 || 0) < (b.visits_2019 || 0) ? 1 : -1
    );
  
    const filteredAllApis = sortedAllApis.filter(filterExceptions());
  
    return {
      props: {
        allApis: filteredAllApis,
        allThemes,
        revalidate: 0,
      },
    };
  };*/

export default RechercherApi;
