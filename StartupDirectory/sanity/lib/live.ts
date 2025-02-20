import 'server-only';
import { defineLive } from 'next-sanity';
import { client } from './client';


export const {sanityFetch, SanityLive} = defineLive({client});

// client is set for fetching live data
// sanityFetch : fetches data live
// SanityLive component is used at last in page.tsx maybe it does something
