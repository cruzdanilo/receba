import getDeliverables from '../server/getDeliverables';

export default async function Home() {
  const deliverables = await getDeliverables();
  return (
    <main>
      <ul>
        {deliverables.map((id) => (
          <li key={String(id)}>{String(id)}</li>
        ))}
      </ul>
    </main>
  );
}
