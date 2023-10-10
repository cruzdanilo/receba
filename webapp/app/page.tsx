import { stringify } from 'viem';
import getDeposits from '../server/getDeposits';
import getDeliverables from '../server/getDeliverables';

export default async function Home() {
  const deposits = await getDeposits();
  const deliverables = await getDeliverables();

  return (
    <main>
      <ul>
        {deposits.map((obj) => {
          const json = stringify(obj, null, 2);
          return (
            <li key={json}>
              <pre>{json}</pre>
            </li>
          );
        })}
        {deliverables.map((id) => (
          <li key={String(id)}>{String(id)}</li>
        ))}
      </ul>
    </main>
  );
}
