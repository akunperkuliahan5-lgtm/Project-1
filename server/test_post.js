async function test() {
  const res = await fetch('http://localhost:3001/api/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: '07', title: 'Test Service', description: 'Test description' }),
  });
  console.log(`Status: ${res.status}`);
  const data = await res.json();
  console.log('Result:', data);
}
test();
