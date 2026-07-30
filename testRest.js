const testAPI = async () => {
  try {
    const resCheck = await fetch('http://localhost/lonking-cms/wp-json/lucky/v1/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'test' })
    });
    const checkData = await resCheck.json();
    console.log('Check Response:', checkData);
    
    const resSpin = await fetch('http://localhost/lonking-cms/wp-json/lucky/v1/spin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'test' })
    });
    const spinData = await resSpin.json();
    console.log('Spin Response:', spinData);
  } catch(e) {
    console.error(e);
  }
}
testAPI();
