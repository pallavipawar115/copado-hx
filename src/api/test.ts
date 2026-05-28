import { getConfig } from '../config';

export const listJobs =
  async () => {

    const response =
      await fetch(
        `${getConfig().cicdBaseUrl}/test-jobs`
      );

    return response.json();
  };

export const pollBuild =
  async (
    buildId: string
  ) => {

    const response =
      await fetch(
        `${getConfig().cicdBaseUrl}/test-jobs`
      );

    const jobs =
      await response.json();

    return jobs.find(
      (job: any) =>
        job.id === buildId
    );
  };