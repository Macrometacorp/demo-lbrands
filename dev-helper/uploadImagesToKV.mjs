#!/usr/bin/env zx

const NAMESPACE_ID = "723596d64b1b43dc876a0c0abbf82e38";

const CREATE = "create";
const DELETE = "delete";
const NA = "n/a";

const pathPrefix = "images/";

const BULK_KV_FILE = "kv_bulk.json";

const operationType = (argv?._[1] || NA).toLowerCase();
console.log(chalk.cyan(`Received operation as "${operationType}"`));

const file = await fs.readFile("./kvpairs.json");
const data = JSON.parse(file.toString());

if (operationType === CREATE) {
  console.log(chalk.blue("Starting to upload to KV..."));

  let promises = [];

  data.forEach((itemObj) => {
    const { images } = itemObj;
    images.forEach((imageObj) => {
      const { image } = imageObj;
      //   TODO: change "value" to reflect the file name
      promises.push(
        $`wrangler kv:key put --namespace-id=${NAMESPACE_ID} "${image}" "${pathPrefix}${image}" --path`
      );
    });
  });

  await Promise.all(promises).catch((err) => {
    console.log(chalk.red(err));
  });
  console.log(chalk.green("Upload completed!"));
} else if (operationType === DELETE) {
  console.log(chalk.blue("Starting to delete KV..."));

  const deleteKV = [];

  data.forEach((itemObj) => {
    const { images } = itemObj;
    images.forEach((imageObj) => {
      const { image, name } = imageObj;
      deleteKV.push({
        key: image,
        value: "",
      });
    });
  });

  await fs.writeFile(BULK_KV_FILE, JSON.stringify(deleteKV));
  console.log(chalk.bgBlue("Created bulk delete local file!"));
  await $`wrangler kv:bulk delete --namespace-id=${NAMESPACE_ID} ${BULK_KV_FILE}`;
  console.log(chalk.green("Deleted from CF KV"));
  await fs.unlink(BULK_KV_FILE);
  console.log(chalk.bgBlue("Deleted bulk delete local file!"));
  console.log(chalk.green("Delete completed!"));
} else {
  console.log(
    chalk.red(
      `Unknown operation "${operationType}". Please provide valid operation types.`
    )
  );
}
