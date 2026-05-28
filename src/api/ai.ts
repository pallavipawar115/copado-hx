export const askAgent =
  async (
    agent: string,
    message: string
  ) => {

    return {
      agent,
      message,

      response:
        `AI Agent "${agent}" processed: ${message}`
    };
  };