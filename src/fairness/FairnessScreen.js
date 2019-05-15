import React from 'react'
import { Info } from 'croods'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import GoBack from 'design/GoBack/GoBack'

const FairnessText = props => (
  <Info
    id="1"
    name="game"
    path="/game_setting"
    render={info => <FairnessTextContent info={info} {...props} />}
  />
)

const FairnessTextContent = ({ info, location }) => (
  <Layout location={location} leftIcon={<GoBack to="/" />}>
    <Typography align="center" variant="body1">
      <div
        dangerouslySetInnerHTML={{
          __html: info.fairnessText,
        }}
      />
    </Typography>
  </Layout>
)

export default FairnessText
