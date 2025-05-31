import { getAllAccounts } from "@/clients/account";
import { getCasts } from "@/clients/feed";

async function main() {
  console.log("Deleting old casts...");
  const accounts = await getAllAccounts();
  console.log("Accounts founds", accounts.length);

  for (const account of accounts) {
    const casts = await getCasts(account.fid);
    console.log("Casts found", casts.length);

    const filteredCasts = casts.filter(
      (cast) => !account.whitelist.includes(cast.hash)
    );
    console.log("Filtered casts", filteredCasts.length);

    for (const cast of filteredCasts) {
      console.log("Deleting cast", cast.hash);

      // await deleteCast(account.signer_uuid, cast.hash);
    }
  }
}

main()
  .then(() => {
    console.log("All done!");
  })
  .catch(console.error);
