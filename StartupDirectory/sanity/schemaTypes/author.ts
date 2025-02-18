import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    // add field that would contain the data
    fields: [
        defineField({
            name:"id",
            type:"number"
        }),
        defineField({
            name:"name",
            type:"string"
        }),
        defineField({
            name:"username",
            type:"string"
        }),
        defineField({
            name:"email",
            type:"string"
        }),
        defineField({
            name:"image",
            type:"url"
        }),
        defineField({
            name:"bio",
            type:"text"
        }),
    ],
    // preview based on title
    preview: {
        select: {
            title: "name",
        }
    }
})