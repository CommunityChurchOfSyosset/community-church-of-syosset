import React from 'react';
import styled from 'styled-components';

import CenteredTextColumn from '../../components/CenteredTextColumn';
import Layout from '../../components/Layout';
import LinkButton from '../../components/LinkButton';
import SEO from '../../components/SEO';
import { baseline } from '../../style';

const StyledLinkButton = styled(LinkButton)`
  margin-bottom: calc(6 * ${baseline});
`;

export default function BeliefPage() {
  return (
    <>
      <SEO title="Belief" />
      <Layout>
        <h1>What we believe</h1>
        <CenteredTextColumn>
          <section>
            <h2>
              The United Church&nbsp;of&nbsp;Christ Statement&nbsp;of&nbsp;Faith
            </h2>
            <p>
              We believe in God, the Eternal Spirit, who is made known to us in
              Jesus our brother, and to whose deeds we testify:
            </p>
            <p>
              God calls the worlds into being, creates humankind in the divine
              image, and sets before us the ways of life and death.
            </p>
            <p>
              God seeks in holy love to save all people from aimlessness and
              sin.
            </p>
            <p>
              God judges all humanity and all nations by that will of
              righteousness declared through prophets and apostles.
            </p>
            <p>
              In Jesus Christ, the man of Nazareth, our crucified and risen
              Lord, God has come to us and shared our common lot, conquering sin
              and death and reconciling the whole creation to its Creator.
            </p>
            <p>
              God bestows upon us the Holy Spirit, creating and renewing the
              church of Jesus Christ, binding in covenant faithful people of all
              ages, tongues, and races.
            </p>
            <p>
              God calls us into the church to accept the cost and joy of
              discipleship, to be servants in the service of the whole human
              family, to proclaim the gospel to all the world and resist the
              powers of evil, to share in Christ’s baptism and eat at his table,
              to join him in his passion and victory.
            </p>
            <p>
              God promises to all who trust in the gospel forgiveness of sins
              and fullness of grace, courage in the struggle for justice and
              peace, the presence of the Holy Spirit in trial and rejoicing, and
              eternal life in that kingdom which has no end.
            </p>
            <p>Blessing and honor, glory and power be unto God.</p>
            <p>Amen.</p>
          </section>
          <StyledLinkButton to="/visit">Visit us</StyledLinkButton>
        </CenteredTextColumn>
      </Layout>
    </>
  );
}
