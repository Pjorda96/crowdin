import crowdin from '@crowdin/crowdin-api-client';
import otaClient from '@crowdin/ota-client';

import Config from '../../config';

const { token } = Config.crowdin;
const hash = 'ca985663a22bac60cb9b8e8u1su';
const client = new otaClient(hash);

// initialization of crowdin client
const { projectsGroupsApi } = new crowdin({ token, /* organization: 'organizationName' // optional */ });

export const languages = [];

export default async function crowdinInit() {
  try {
    // const projects = await projectsGroupsApi.listProjects();
    // console.log(`projects`, projects.data[0].data)

    // const filesList = await client.listFiles()
    // console.log(`filesList`, filesList)

    // filesList.forEach(async file => {
    //   const fileTrans = await client.getFileTranslations(file, 'en')
    //   console.log(`fileTrans`, fileTrans)
    // })

    const translations = await client.getTranslations()
    const modifiedTrans = translations[Object.keys(translations)[0]];
    modifiedTrans.forEach(el => {
      const languageName = el.file.split('/')
      const name = languageName[languageName.length - 1].split('.')[0].split('-')[0];
      
      if (!languages.filter(el => el.name === name).length) {
        const lang = { name, content: el.content }
        languages.push(lang);
      }
    });

    return languages;

    // translations.en.forEach(el => {
    //   console.log(`el`, el)
    // });
  } catch (error) {
    console.error(error);
  }
}
