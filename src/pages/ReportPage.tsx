import { Box, Container, Typography } from '@mui/material';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import TopBar from '../components/TopBar';

interface EmbedInfo {
  accessToken: string;
  embedUrl: string;
  expiry: string; // o Date
}

const ReportPage: React.FC = () => {
  const [ embedInfo, setEmbedInfo ] = useState<EmbedInfo | null>( null );
  const [ error, setError ] = useState<string>( '' );

  useEffect( () => {
    const fetchEmbedInfo = async () => {
      try {
        const response = await axiosInstance.get( '/getEmbedToken' );
        if ( response.data.accessToken && response.data.embedUrl ) {
          setEmbedInfo( {
            accessToken: response.data.accessToken,
            embedUrl: response.data.embedUrl,
            expiry: response.data.expiry,
          } );
        } else {
          setError( 'No se pudo obtener la información de Power BI' );
        }
      } catch ( e: any ) {
        setError( 'Ocurrió un error al solicitar el token de incrustación' );
      }
    };

    fetchEmbedInfo();
  }, [] );

  return (
    <div style={ { display: 'flex', flexDirection: 'column', height: '100vh' } }>
      <TopBar />

      <Container maxWidth="lg" sx={ { flexGrow: 1, mt: 2 } }>
        <Box sx={ { height: '80vh' } }>
          { error && <Typography color="error">{ error }</Typography> }

          { embedInfo && (
            <PowerBIEmbed
              embedConfig={ {
                type: 'report',
                embedUrl: embedInfo.embedUrl,
                accessToken: embedInfo.accessToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    pageNavigation: {
                      position: models.PageNavigationPosition.Left,
                    },
                    filters: {
                      expanded: true,
                      visible: true,
                    },
                  },
                  background: models.BackgroundType.Transparent,
                },
              } }
              cssClassName="report-style-class"
            />
          ) }
        </Box>
      </Container>
    </div>
  );
};

export default ReportPage;
