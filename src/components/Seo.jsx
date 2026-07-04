import { Helmet } from "react-helmet-async";

const SITE_URL = "https://tarunsahuhousecleaning.com";
const SITE_NAME = "Tarun Sahu House Cleaning";

function Seo({ title, description, path = "/" }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}

export default Seo;
