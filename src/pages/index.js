import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import SpellsList from 'components/SpellsList';

const IndexPage = () => (
  <Layout>
    <SpellsList/>
  </Layout>
)

export default IndexPage
