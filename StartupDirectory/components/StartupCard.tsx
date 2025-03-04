import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'

// using typegen, Author and Startup types are created automatically in /sanity/types
export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author}


const StartupCard = (
    {post}:{post:StartupTypeCard}
) => {

    const {_createdAt, views, title, category, _id, image, description, author} = post;

    return (
        <li className="startup-card group">
            
            <div className="flex-between">
                <p className="startup_card_date">
                    {/* using formatDate from utils that we made custom to return local date string*/}
                    { formatDate(_createdAt) }
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className='size-6 text-primary' />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1"> {author?.name} </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>

                <Link href={`user/${author?._id}`}>
                    {/* ! mark determines to TS that, property may look null but it will surely hold a value */}
                    <Image src={image!} alt={title!} width={48} height={48} 
                    className='rounded-full'/>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Placeholder" className='startup-card_img' />
                {/* img does work we need, w/custom css but next's <Image> is not that suitable here */}
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">
                        {category}
                    </p>
                </Link>

                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
            
        </li>
    )
}

export const StartupCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );

export default StartupCard