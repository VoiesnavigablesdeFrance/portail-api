import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSidePropsContext, GetServerSideProps } from 'next';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import jwt from 'jsonwebtoken';

import {
  getAPI,
  getAllServices,
  IService,
  IApi,
  getAllAPIs,
  getAllGuides,
  IGuideElementShort,
} from '../../model';
import Page from '../../layouts';

import {
  PageHeader,
  Access,
  SupportAndTeam,
  Partners,
  TechnicalDocumentation,
  ApiOpenDataSources,
  ApiDescription,
} from '../../components/api';

import ApiDetails from '../../components/api/apiDetails';
import { HEADER_PAGE } from '../../components';

import constants from '../../constants';
import Feedback from '../../components/feedback';
import { IDataGouvDataset, fetchDatagouvDatasets } from '../../components/api/apiOpenDataSources';

import { useRouter } from 'next/router';
import { Alert, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  api: IApi;
  services: IService[];
  guides: IGuideElementShort[];
  datagouvDatasets: IDataGouvDataset[];
}

const API: React.FC<IProps> = ({ api, guides, datagouvDatasets }) => {
  const {
    slug,
    title,
    tagline,
    logo,
    owner,
    owner_acronym,
    owner_slug,
    uptime,
    contact_link,
    account_link,
    doc_tech_link,
    doc_tech_external,
    monitoring_link,
    monitoring_description,
    rate_limiting_description,
    rate_limiting_resume,
    rate_limiting_link,
    stats_detail_description,
    stats_detail_resume,
    stats_detail_link,
    body,
    is_open,
    partners,
    content_intro,
    is_france_connected,
    hide_pre_footer,
  } = api;

  const router = useRouter();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  Alert.displayName = 'Alert'; // Ajoutez cette ligne pour définir le nom d'affichage
  

  const handleEditButtonClick = () => {
    const apiJSON = JSON.stringify(api);
    router.push({
      pathname: '../editApi',
      query: { apiJSON },
    });
  };

  const [openSuccessToast, setOpenSuccessToast] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDeleteButtonClick = () => {
    fetch("http://localhost:3001/api/crudApi/deleteApi", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(api),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Réponse du serveur :', data);
        if (data.message === "Le fichier Markdown a été supprimé avec succès.") {
          setSuccessMessage("Le fichier Markdown a été supprimé avec succès.");
          setOpenSuccessToast(true);
          setErrorMessage(null);
          router.push('/')
        } else {
          setErrorMessage("Erreur lors de la suppression du fichier Markdown.");
          setOpenErrorToast(true);
          setSuccessMessage(null);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi des données :', error);
        setErrorMessage("Erreur lors de l'envoi des données : " + error.message);
        setOpenErrorToast(true);
        setSuccessMessage(null);
      });
  };

  const handleCloseSuccessToast = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessToast(false);
  };
  
  const handleCloseErrorToast = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorToast(false);
  };

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token);
        if (typeof decodedToken !== 'string' && decodedToken && 'role' in decodedToken) {
          const role = decodedToken.role;
          if (role === "admin") {
            setIsAuthorized(true)
          }
        }
      }
    }
  }, []);

  return (
    <Page
      headerKey={HEADER_PAGE.APIS}
      title={title}
      description={`${title} est l'une des APIs du service public. ${tagline}`}
      canonical={`https://api.gouv.fr/les-api/${slug}`}
      usePreFooter={!hide_pre_footer}
    >
      <PageHeader
        title={title}
        logo={logo || constants.logo}
        tagline={tagline}
        owner={owner}
        owner_acronym={owner_acronym}
        owner_slug={owner_slug}
      />

      <div id="description" className="fr-container">
        <div className="right-column-grid">
          <div className="left-column text-style">
            <ApiDescription
              guides={guides}
              body={body}
              content_intro={content_intro}
            />
            <Feedback />
          </div>
          <div className="right-column info-column">
            <Access
              is_open={is_open}
              slug={slug}
              doc_swagger_link={doc_tech_link}
              doc_external_link={doc_tech_external}
              account_link={account_link}
            />
            <SupportAndTeam
              logo={logo}
              owner={owner}
              owner_acronym={owner_acronym}
              owner_slug={owner_slug}
              link={contact_link}
            />
            <TechnicalDocumentation
              swagger_link={doc_tech_link}
              external_link={doc_tech_external}
              slug={slug}
            />
            <ApiDetails
              monitoring={monitoring_description}
              monitoring_link={monitoring_link}
              rate_limiting={rate_limiting_description}
              rate_limiting_resume={rate_limiting_resume}
              rate_limiting_link={rate_limiting_link}
              stats_detail={stats_detail_description}
              stats_detail_resume={stats_detail_resume}
              stats_detail_link={stats_detail_link}
              uptime={uptime}
              is_france_connected={is_france_connected}
            />

            <Partners partners={partners} />
            {isAuthorized ? (
              <>
                <Button variant="outlined" onClick={handleDeleteButtonClick} startIcon={<DeleteIcon />}>
                  Delete
                </Button> 
                <Button variant="contained" onClick={handleEditButtonClick} endIcon={<EditIcon />}>
                  Edit API
                </Button>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        #description {
          margin-bottom: 70px;
        }

        .right-column-grid {
          display: grid;
          grid-template-columns: 65% 31%;
          grid-gap: 40px;
        }

        .info-column {
          border-left: 2px solid ${constants.colors.lightBlue};
          padding: 0 0 0 40px;
        }
        @media only screen and (min-width: 1px) and (max-width: 900px) {
          .right-column-grid {
            display: flex;
            flex-direction: column-reverse;
          }
          .info-column {
            border: none;
            padding: 0;
          }
        }
      `}</style>

      <Snackbar
        open={openSuccessToast}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseSuccessToast}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorToast}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseErrorToast}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
};

/*export const getStaticPaths: GetStaticPaths = async () => {
  const apis = await getAllAPIs();

  return {
    paths: apis.map(api => {
      return {
        params: {
          slug: api.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const api = await getAPI(slug);

  const datagouvDatasets = await fetchDatagouvDatasets(api.datagouv_uuid || []);

  const allServices = await getAllServices();
  const services = allServices.filter(service => {
    return service.api.indexOf(api.title) > -1;
  });

  const allGuides = await getAllGuides();
  const guides = allGuides
    .filter(guide => {
      return guide.api && guide.api.indexOf(api.title) > -1;
    })
    .map(guide => {
      const { title, slug, image = null } = guide;
      return { title, slug, image };
    });

  return { props: { api, services, guides, datagouvDatasets } };
};*/

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
)=> {
  const slug = context.params?.slug as string;

  const api = await getAPI(slug);

  const datagouvDatasets = await fetchDatagouvDatasets(api.datagouv_uuid || []);

  const allServices = await getAllServices();
  const services = allServices.filter(service => {
    return service.api.indexOf(api.title) > -1;
  });

  const allGuides = await getAllGuides();
  const guides = allGuides
    .filter(guide => {
      return guide.api && guide.api.indexOf(api.title) > -1;
    })
    .map(guide => {
      const { title, slug, image = null } = guide;
      return { title, slug, image };
    });

  return { props: { api, services, guides, datagouvDatasets } };
}

export default API;
