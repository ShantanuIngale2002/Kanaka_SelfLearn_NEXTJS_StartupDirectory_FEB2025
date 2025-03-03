// this only runs on server
import 'server-only'

import { createClient } from 'next-sanity'

// get token as well
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // pass this write token
})

// error handling if not token
if(!writeClient.config().token){
    throw new Error("Write Token Not Found !!");
}
