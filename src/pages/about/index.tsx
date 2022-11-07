import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../../components/CenteredTextColumn';
import FlexContainer from '../../components/FlexContainer';
import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';
import SEO from '../../components/SEO';
import { baseline } from '../../style';

const StyledLinkButton = styled(LinkButton)`
  flex: 1;
  margin: 0 calc(3 * ${baseline}) calc(6 * ${baseline});

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export default function AboutPage() {
  return (
    <>
      <SEO title="About" />
      <Layout>
        <h1>Who we are</h1>
        <CenteredTextColumn>
          <section>
            <h2>A pilgrim people</h2>
            <p>
              —seekers and learners in spiritual matters, in pursuit of
              authenticity, wholeness, and faithfulness. God never fails to
              respond to sincere hearts and inquiring minds.
            </p>
            <p>
              In a historical sense, the United Church of Christ traces its
              roots to the pilgrims who came to the shores of the New World in
              1620. We were known as congregationalists, recognizing the
              autonomy of the independent church. In 1852 we became the first
              church established in Syosset, New York.
            </p>
          </section>
          <section>
            <h2>A progressive ministry</h2>
            <p>
              —that takes the Bible seriously, but not literally. We acknowledge
              its historicity as inspired testimony of a people called by God,
              and believe that God has more light yet to be revealed.
            </p>
            <p>
              We look to Jesus of Nazareth, who became the Christ, as our means
              for understanding what it is to be authentically human. We believe
              that the truth which Jesus embodies and leads us to is a truth
              other religions point to as well. We earnestly pursue interfaith
              dialogue to discover our unique origins, celebrate what we share
              in common, and transcend our differences.
            </p>
          </section>
          <section>
            <h2>A passionate community</h2>
            <p>
              —deeply committed to peace, justice, and the alleviation of
              suffering through compassion and wisdom. We welcome people of all
              races, nationalities, abilities, gender identities, and sexual
              orientations into every aspect of church life and ministry.
            </p>
          </section>
          <FlexContainer>
            <StyledLinkButton to="/visit">Visit us</StyledLinkButton>
            <StyledLinkButton to="/about/belief">Our belief</StyledLinkButton>
          </FlexContainer>
        </CenteredTextColumn>
      </Layout>
    </>
  );
}
