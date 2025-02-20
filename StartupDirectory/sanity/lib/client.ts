import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // if true : for 60 sec, data from first req gets cached and later any req will get only cached data even though source is updated ie. In a 60 sec, first req is made to source, later all made to cached data
  // if false :  every req will made to source.
  // For learning topic Cache and Live API w/ nextjs, setting it to false
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
