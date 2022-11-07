import { graphql, Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CenteredTextColumn from '../components/CenteredTextColumn';
import Layout from '../components/Layout';
import PageButtons from '../components/PageButtons';
import SEO from '../components/SEO';
import ShareSection from '../components/ShareSection';
import TitledList from '../components/TitledList';
import VideoPlayer from '../components/VideoPlayer';
import { baseline, color } from '../style';

export const query = graphql`
  query ServiceTemplate($id: String!) {
    contentfulService(id: { eq: $id }) {
      date
      preacher {
        image {
          description
          gatsbyImageData(height: 48, layout: FIXED, quality: 100, width: 48)
        }
        name
        role
        slug
      }
      scriptureReadings
      title
      videoUrl
    }
  }
`;

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
};

const IconFrame = styled.div`
  align-items: center;
  border: 1px dashed ${color.body};
  border-radius: ${baseline};
  display: flex;
  height: calc(12 * ${baseline});
  justify-content: space-around;
  margin-right: calc(3 * ${baseline});
  width: calc(12 * ${baseline});
`;

const Preacher = styled.div`
  display: flex;
  margin-bottom: calc(6 * ${baseline});
`;

const PreacherDetails = styled.p`
  margin-bottom: 0;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: calc(9 * ${baseline});
`;

const StyledImage = styled(GatsbyImage)`
  border-radius: ${baseline};
  margin-right: calc(3 * ${baseline});
`;

const StyledPageButtons = styled(PageButtons)`
  margin-bottom: calc(6 * ${baseline});
`;

const StyledTitledList = styled(TitledList)`
  margin-bottom: calc(6 * ${baseline});
`;

const StyledVideoPlayer = styled(VideoPlayer)`
  border-radius: ${baseline};
  margin: calc(6 * ${baseline}) 0;
`;

export interface Props {
  readonly data: {
    readonly contentfulService: {
      readonly date: string;
      readonly preacher: {
        readonly image?: {
          readonly description?: string;
          readonly gatsbyImageData: IGatsbyImageData;
        };
        readonly name: string;
        readonly role: string;
        readonly slug: string;
      };
      readonly scriptureReadings: readonly string[];
      readonly title: string;
      readonly videoUrl: string;
    };
  };
  readonly pageContext: {
    readonly nextSlug?: string;
    readonly prevSlug?: string;
  };
}

export default function ServiceTemplate(props: Props) {
  const [year, month, day] = props.data.contentfulService.date.split('-');
  const dateObject = new Date(+year, +month - 1, +day);

  const dateString = dateObject.toLocaleDateString(
    undefined,
    DATE_FORMAT_OPTIONS
  );

  return (
    <>
      <SEO title={props.data.contentfulService.title} />
      <Layout>
        <h1>{props.data.contentfulService.title}</h1>
        <CenteredTextColumn>
          <Link to={`/people/${props.data.contentfulService.preacher.slug}`}>
            <Preacher>
              {props.data.contentfulService.preacher.image ? (
                <StyledImage
                  alt={
                    props.data.contentfulService.preacher.image.description ||
                    ''
                  }
                  image={
                    props.data.contentfulService.preacher.image.gatsbyImageData
                  }
                />
              ) : (
                <IconFrame>
                  <StyledFontAwesomeIcon icon="user" />
                </IconFrame>
              )}
              <PreacherDetails>
                <b>{props.data.contentfulService.preacher.name}</b> <br />
                {props.data.contentfulService.preacher.role}
              </PreacherDetails>
            </Preacher>
          </Link>
          <p>
            <time dateTime={props.data.contentfulService.date}>
              {dateString}
            </time>
          </p>
          <StyledTitledList title="Scripture readings" type="unordered">
            {props.data.contentfulService.scriptureReadings}
          </StyledTitledList>
          <StyledVideoPlayer url={props.data.contentfulService.videoUrl} />
          <ShareSection contentType="service" />
          {(props.pageContext.nextSlug || props.pageContext.prevSlug) && (
            <StyledPageButtons
              nextSlug={props.pageContext.nextSlug}
              prevSlug={props.pageContext.prevSlug}
              rootSlug="services"
            />
          )}
        </CenteredTextColumn>
      </Layout>
    </>
  );
}
