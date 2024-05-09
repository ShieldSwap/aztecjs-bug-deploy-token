import { getInitialTestAccountsWallets } from "@aztec/accounts/testing";
import { createPXEClient, waitForPXE } from "@aztec/aztec.js";
import { TokenContract } from "@aztec/noir-contracts.js";

main();
async function main() {
  const pxeClient = createPXEClient("http://localhost:8080");
  await waitForPXE(pxeClient);
  const [alice] = await getInitialTestAccountsWallets(pxeClient);

  const tokenContract = await TokenContract.deploy(
    alice,
    alice.getAddress(),
    "USD Coin",
    "USDC",
    6,
  )
    .send()
    .deployed();
  console.log(`Token contract address: ${tokenContract.address}`);
}
