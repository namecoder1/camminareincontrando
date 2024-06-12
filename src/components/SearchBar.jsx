// import Fuse from "fuse.js";
import { useState } from "react";
import { sanityClient } from "sanity:client";

async function getFilteredPosts(searchToken) {
  const groqQuery = `
      *[(
        _type == "post"
        && !(_id in path("drafts.**"))
        && (
          title match "*${searchToken}*"
          || pt::text(body) match "*${searchToken}*"
          || excerpt match "*${searchToken}*"
        )
      )]
      | score(
        pt::text(body) match "*${searchToken}*",
        boost(title match "*${searchToken}*", 3),
        boost(excerpt match "*${searchToken}*", 2)
      ){
        _id,
        "slug": slug.current,
        title,
        excerpt,
      }
    `;

  const filteredPostsResult = await sanityClient.fetch(groqQuery);
  return filteredPostsResult;
}

function SearchBar() {
  const [currentPostsResult, setCurrentPostsResult] = useState(null);

  const handleOnChange = async (event) => {
    const searchToken = event.target.value;
    if (searchToken.length > 0) {
      getFilteredPosts(searchToken).then((posts) => {
        setCurrentPostsResult(posts);
      });
    } else {
      setCurrentPostsResult(null);
    }
  };

  return (
    <>
      <section>
        <p className="text-center mb-2 text-xl font-semibold text-white">
          <label>Cerca:</label>
        </p>
        <p>
          <input
            type="search"
            placeholder="Cerca ora.."
            onChange={handleOnChange}
            className="w-full p-2 rounded-lg"
          />
        </p>
      </section>
      {currentPostsResult ? (
        <section className="bg-gray-400/80 rounded-bl-xl rounded-br-xl -mx-3 mt-4 -mb-3 p-4">
          <ul>
            {currentPostsResult.map((post) => (
              <li key={post._id} className="mb-6 last:mb-0 bg-gray-600/20 p-2 rounded-lg hover:opacity-80">
                <a href={'/blog/' + post.slug}>
                  <h2>
                    <b className="text-gray-900 font-semibold">{post.title}</b>
                  </h2>
                  <p className="font-normal text-gray-800 mt-1">
                    <i>{post.excerpt}</i>
                  </p>
                </a>
                
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-center mt-2 text-white">Nessun Risultato</p>
      )}
    </>
  );
}

export default SearchBar;





