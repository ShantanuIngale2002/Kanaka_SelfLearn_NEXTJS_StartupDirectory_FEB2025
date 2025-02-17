import React from 'react'
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = (
    {query}:{query?:string}
) => {

    {/*
        Change Descriptions:
            1.  {
                    - This is server side component where button and reset() is client side
                    - Hence need to make separate client side compnent named SearchFormReset.tsx
                }
    */}


    {/*
        const reset = () => {
            const form = document.querySelector('.search-form') as HTMLFormElement;
            if(form)    form.reset();
        }
        >> Change Description 01
    */}
    

    return (
        // The from in nextjs support server side rendering functionalities
        <Form action="/" scroll={false} className='search-form'>
            <input name='query' defaultValue={query} className='search-input' placeholder='Search Startups' />
            <div className="flex gap-2">
                {/* 
                    {query && (
                        <button type="reset" onClick={reset}>  </button>
                    )}
                    >> Change Description 01
                */}
                {query && <SearchFormReset /> }

                <button 
                    type="submit" 
                    className='search-btn text-white'>
                        <Search className='size-5'/>
                </button>

            </div>
        </Form>
    )
}

export default SearchForm