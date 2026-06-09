import Conf from 'conf';

interface CopadoConfig {

  cicdBaseUrl?: string;

  crtBaseUrl?: string;

  bearerToken?: string;

  pak?: string;

  orgId?: string;
}

const store =
  new Conf<CopadoConfig>({
    projectName: 'copado-hx'
  });

export const getConfig =
  () => store.store;

export const setConfig =
  (
    config:
      Partial<CopadoConfig>
  ) => {

    Object.entries(config)
      .forEach(
        ([key, value]) => {

          store.set(
            key as keyof CopadoConfig,
            value
          );

        }
      );
  };
  