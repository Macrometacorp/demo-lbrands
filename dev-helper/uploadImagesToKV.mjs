#!/usr/bin/env zx

const NAMESPACE_ID = '723596d64b1b43dc876a0c0abbf82e38'

const CREATE = 'create'
const DELETE = 'delete'

const key = 'automateKey'
const value = 'images/sample.jpg'

const operationType = (argv?._[1] || CREATE).toLowerCase()
console.log(chalk.cyan(`Received operation as "${operationType}"`))

if (operationType === CREATE) {
    console.log(chalk.blue('Starting to upload to KV...'))
    await $`wrangler kv:key put --namespace-id=${NAMESPACE_ID} "${key}" "${value}" --path`
    console.log(chalk.green('Upload completed!'))
} else if(operationType === DELETE) {
    console.log(chalk.blue('Starting to delete KV...'))
    await $`wrangler kv:key delete --namespace-id=${NAMESPACE_ID} "${key}"`
    console.log(chalk.green('Delete completed!'))
} else {
    console.log(chalk.red(`Unknown operation "${operationType}". Please provide valid operation types.`))
}
