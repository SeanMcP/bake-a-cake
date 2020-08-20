<script>
  let domain = "users";
  let query = "seanmcp";
  $: responsePromise = fetch(
    `https://api.github.com/search/${domain}?q=${query}`
  ).then((res) => res.json());
</script>

<main>
  <h1>Svelte GitHub Search</h1>
  <form on:submit|preventDefault>
    <select aria-label="Domain" bind:value={domain} name="domain">
      <option value="users">Users</option>
      <option value="repositories">Repositories</option>
    </select>
    <input
      aria-label="Query"
      bind:value={query}
      name="query"
      placeholder="Search..."
      type="search" />
  </form>
  <hr />
  {#await responsePromise}
    <p>Loading...</p>
  {:then data}
    <h2>Results</h2>
    <ul>
      {#each data.items as item}
        <li>
          <a href={item.html_url} rel="noopener noreferrer">
            {item.login || item.full_name}
          </a>
        </li>
      {/each}
    </ul>
  {:catch error}
    <p>Uh oh! Something went wrong.</p>
  {/await}
</main>
