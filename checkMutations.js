async function run() {
  const q = `
    query {
      __type(name: "CreateWinnerInput") {
        inputFields {
          name
          type {
            name
            kind
            ofType { name, kind }
          }
        }
      }
    }
  `;
  const res = await fetch('http://localhost/lonking-cms/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
