import axios from "axios"

export default async function getApcData({ issn }: { issn: string }) {
  const data = await axios(
    `https://olap.openapc.net/cube/openapc/aggregate?drilldown=journal_full_title|issn&cut=issn:${issn}`
  ).then((res) => res.data)

  return data
}
