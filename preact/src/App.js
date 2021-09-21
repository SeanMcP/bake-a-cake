import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function App() {
  const [domain, setDomain] = useState("users");
  const [query, setQuery] = useState("seanmcp");
  const [itemsCache, setItemsCache] = useState([]);
  const [error, setError] = useState(false);

  function handleChange(setter) {
    return (e) => setter(e.target.value);
  }

  useEffect(async () => {
    async function req() {
      const response = await fetch(
        `https://api.github.com/search/${domain}?q=${query}`
      );
      return await response.json();
    }
    if (query) {
      try {
        const data = await req();
        setItemsCache(data.items);
      } catch (error) {
        setError(Boolean(error));
      }
    }
  }, [domain, query]);

  return (
    <main>
      <h1>Preact GitHub Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <select
          aria-label="Domain"
          onChange={handleChange(setDomain)}
          value={domain}
          name="domain"
        >
          <option value="users">Users</option>
          <option value="repositories">Repositories</option>
        </select>
        <input
          aria-label="Query"
          value={query}
          name="query"
          onChange={handleChange(setQuery)}
          placeholder="Search..."
          type="search"
        />
      </form>
      <hr />
      {error ? (
        <p>Uh oh! Something went wrong</p>
      ) : query ? (
        itemsCache.length > 0 ? (
          <ul>
            {itemsCache.map((item) => (
              <li>
                <a href={item.html_url} rel="noopener noreferrer">
                  {item.login || item.full_name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )
      ) : (
        <p>Search for {domain} on GitHub</p>
      )}
    </main>
  );
}
