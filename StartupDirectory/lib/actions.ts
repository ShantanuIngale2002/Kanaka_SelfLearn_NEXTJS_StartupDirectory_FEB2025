// server actions
'use server'

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify';
import { writeClient } from "@/sanity/lib/write-client";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPitch = async (state:any , form:FormData, pitch:string) => {
    const session = await auth(); // get session

    // if user not found
    if(!session){
        return parseServerActionResponse({error: 'Not signed in', status: 'ERROR'});
    }

    // if user exist

    // destructure form data except 'pitch' field
    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key!='pitch'),
    );

    // create a slug
    const slug = slugify(title as string, {lower: true, strict: true});

    try{
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author:{
                _type: 'reference',
                _ref: session?.id
            },
            Pitch: pitch,
        };

        const result = await writeClient.create({
            _type: 'startup',
            ...startup
        });

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        });

    } catch(error){
        console.log(error);
        return parseServerActionResponse({error: JSON.stringify(error), status: 'ERROR'});
    }


}