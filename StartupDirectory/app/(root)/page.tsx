import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

export default async function Home(
    {searchParams}:{searchParams: Promise<{query?:string}>}
  ){

    const query = (await searchParams).query;

    const posts =[
      {
        _createdAt: new Date(2025, 1, 12, 7, 30, 34),
        _id:1,
        views: 55,
        author: {_id:1001, name:"Ved Vyas"},
        description: "Mahabharata is an encient Hindu scripture, that specifies an huge war of dwaparyug named over the book. The war was fought between Pandavas, the pandu putras and Kauravas, the kaurav putras. It describes how this great was fought and how a legend (God in Hindu) Shree Krishna had his hand over the war. The war is also called as Dharm Yudh, where pandas and krishna from dharm and kauravas and other warrior on their side from adharm.",
        image: "https://img.freepik.com/premium-photo/lord-krishna-arjuna-chariot_669954-60304.jpg?w=740",
        category: "Hindu Mahagrantha",
        title: "Mahabharata"
      }
    ];

    return(
      <>
        <section className="pink_container">
          <h1 className="heading">Pitch your startup, <br /> Connect with Entrepreneurs</h1>
          <p className="sub-heading !max-w-3xl">
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competition 
          </p>
          <SearchForm query={query}/>
        </section>

        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for ${query}` : "All Startups"}
          </p>
          <ul className="mt-7 card_grid">
            {
              posts.length > 0
              ? (
                posts.map((post: StartupTypeCard, index:number)=>(
                  <StartupCard key={post?.id} post={post} />
                ))
              ) : (
                <p className="no-results">No Startups found!!</p>
              )
            }
          </ul>
        </section>
      </>
  );
}