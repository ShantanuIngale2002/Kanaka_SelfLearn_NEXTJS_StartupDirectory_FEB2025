import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startups",
    type: "document",
    fields: [
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source: 'title' // slug will be provided automatically by sanity using title ex. <TITLE> is a great startup
            }
        }),
        defineField({
            name:"author",
            type:"reference",
            to: {type: "author"}  // ref to author
        }),
        defineField({
            name:"views",
            type:"number"
        }),
        defineField({
            name:"description",
            type:"text"
        }),
        defineField({
            name:"category",
            type:"string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category") // required string field w/ 1<=length<=20 ELSE error msg
        }),
        defineField({
            name:"image",
            type:"url",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name: "Pitch",
            type: "markdown" // custom field, use custom markdown plugin by sanity (npm i sanity-plugin-markdown)
        })
    ],
});