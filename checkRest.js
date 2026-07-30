async function run() {
  const res = await fetch('http://localhost/lonking-cms/wp-json/wp/v2/types', {
    method: 'GET'
  });
  const data = await res.json();
  console.log(Object.keys(data));
}
run();
