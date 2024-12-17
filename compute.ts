import { Nautilus } from '@deltadao/nautilus'

export async function compute(nautilus: Nautilus, datasetDid?: string, algoDid?: string) {
  const dataset = {
    did: datasetDid || 'did:op:afb1fac852ac4024e8c10f67cb9a37fd261c23d22086da851671d4e1d96af610' // any 'compute' dataset
    // userdata: { // optional
    //     myNumberParam: 8
    // }
  }

  const algorithm = {
    did: algoDid || 'did:op:ed7f042f65d3d4dee20be9f2be74e153a728ead23cb2ac6fcd6584bdd6169e30' // any 'compute' algorithm allowed to be run on the given dataset (needs to be whitelisted on the dataset)
  }

  const computeConfig = {
    dataset,
    algorithm
  }

  const computeJob = await nautilus.compute(computeConfig)
  console.log('COMPUTE JOB: ', computeJob)
  return Array.isArray(computeJob) ? computeJob[0] : computeJob
}

export async function getComputeStatus(
  nautilus: Nautilus,
  providerUri: string,
  jobId?: string
) {
  const computeJobStatus = await nautilus.getComputeStatus({
    jobId: jobId || 'bfd2eb0418c44a229d8346d66e3384bd',
    providerUri
  })
  console.log('Compute Job Status: ', computeJobStatus)
}

export async function retrieveComputeResult(
  nautilus: Nautilus,
  providerUri: string,
  jobId?: string
) {
  const computeResult = await nautilus.getComputeResult({
    jobId: jobId || '38d3ab56002844ac92fd72803129654b',
    providerUri
  })
  console.log('Compute Result URL: ', computeResult)
}
