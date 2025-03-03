import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';

const View = async ({id}:{id: string}) => {

    // const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});

    // TODO - Update view whenever this page/post is viewed

    // real-time views fetch
    const {data} = await sanityFetch({query: STARTUP_VIEWS_QUERY, params:{id}});

    return (
        <>
            <div className="view-container">
                <div className="absolute -top-2 -right-2">
                    <Ping />
                </div>

                <div className="view-text">
                    <span className="font-black">
                        {data.views} Views
                    </span>
                </div>
            </div>

            {/* required for real-time data fetching */}
            <SanityLive />
        </>
    )
}

export default View