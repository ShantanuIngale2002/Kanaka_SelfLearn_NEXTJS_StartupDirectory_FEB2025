import { defineQuery } from "next-sanity";


// search for startup having slug and matches search from navbar with title, if not then category, if not then author
// Note - search is done as word-basis like tokenization
//          ie. for 'SI Banana wafers', 'banana' will work but not 'bana'

export const STARTUPS_QUERY = 
    defineQuery(`*[
                    _type == 'startup' 
                    && defined(slug.current) 
                    && !defined($search) 
                    || title match $search 
                    || category match $search 
                    || author->name match $search
                ] 
                | order(_createdAt desc){
                    _id,
                    title,
                    slug,
                    _createdAt,
                    author -> {
                        _id, name, image, bio
                    },
                    views,
                    description,
                    category,
                    image    
                }`);

export const STARTUP_BY_ID_QUERY = 
    defineQuery(`*[ 
                    _type == 'startup' 
                    && _id == $id 
                ] [0]
                {
                    _id,
                    title,
                    slug,
                    _createdAt,
                    author -> {
                        _id, name, username, image, bio
                    },
                    views,
                    description,
                    category,
                    image,
                    Pitch,
                }`);

export const STARTUP_VIEWS_QUERY = 
    defineQuery(`*[ 
                    _type == 'startup' 
                    && _id == $id 
                ] [0]
                {
                    _id,
                    views
                }`);

export const AUTHOR_BY_GITHUB_ID_QUERY = 
    defineQuery(`*[ 
                    _type == 'author' 
                    && id == $id 
                ] [0]
                {
                    _id,
                    id,
                    name,
                    username,
                    email,
                    image,
                    bio
                }`);
