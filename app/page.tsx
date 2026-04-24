export default async function Page() {
  const data = await getData()

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
