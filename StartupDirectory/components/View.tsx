import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { writeClient } from '@/sanity/lib/write-client';
import { unstable_after as after } from 'next/server';

const View = async ({id}:{id: string}) => {

    // TODO - Update view whenever this page/post is viewed

    // since we are updating/writing the views, we dont need to get real time because that will just continue increasing the count bcz this component will get reloaded again anad again, rather once for single view.
    const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});

    // page is viewed, so, for post of this id, incr views count and save changes.
    // but do this without blocking UI ie. in-background using unstable_after() as after() -> this schedule work to be executed after response is finished / UI is loaded
    after(async() => {
        await writeClient
                .patch(id)
                .set({views: totalViews + 1})
                .commit();
    });

    return (
        <>
            <div className="view-container">
                <div className="absolute -top-2 -right-2">
                    <Ping />
                </div>

                <div className="view-text">
                    <span className="font-black">
                        {totalViews} Views
                    </span>
                </div>
            </div>
        </>
    )
}

export default View