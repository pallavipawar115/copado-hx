import { getConfig } from '../config';

const headers = () => ({
  Authorization: `Bearer ${getConfig().bearerToken}`,
  'Content-Type': 'application/json'
});

export const commit = async (
  storyId: string
) => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/actions/commit`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        userStoryId: storyId
      })
    }
  );

  return response.json();
};

export const promote = async (
  storyId: string
) => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/actions/promote`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        userStoryId: storyId
      })
    }
  );

  return response.json();
};

export const validate = async (
  storyId: string
) => {

  return {
    success: true,
    storyId,
    jobExecutionId: 'JOB-001',
    status: 'Validation Started'
  };

};

export const deploy = async (
  storyId: string
) => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/actions/deploy`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        userStoryId: storyId
      })
    }
  );

  return response.json();
};

export const listStories = async () => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/user-stories`,
    {
      headers: headers()
    }
  );

  return response.json();
};

export const getStory = async (
  id: string
) => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/user-stories/${id}`,
    {
      headers: headers()
    }
  );

  return response.json();
};

export const listEnvironments = async () => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/environments`,
    {
      headers: headers()
    }
  );

  return response.json();
};

export const pollJob = async (
  jobId: string
) => {

  const response = await fetch(
    `${getConfig().cicdBaseUrl}/job-executions`
  );

  const jobs = await response.json();

  return jobs.find(
    (job: any) =>
      job.id === jobId
  );
};