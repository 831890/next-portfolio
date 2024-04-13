import { TOKEN, DATABASE_ID } from '../../../config/index.js';
import Title from '../../components/title.js';
import ProjectItem from '../../components/projectItem.js';

async function getData() {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: 'project-title',
          property: 'project-sub-title',
          direction: 'ascending',
        },
      ],
      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options);
  const projectsResponse = await res.json();
  console.log(
    'projects',
    projectsResponse.results.map((project) => project.properties['project-title'].title[0].plain_text)
  );
  console.log(
    'projects',
    projectsResponse.results.map((project) => project.properties['project-sub-title'].rich_text[0].plain_text)
  );

  return projectsResponse.results;
}

export default async function Projects2() {
  const results = await getData();
  return (
    <>
      <section className="body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* 타이틀 */}
          <Title tit={'PROJECTS'} desc={"Something I've made for fun or made by the company!"} />
          {results && (
            <>
              <div className="flex flex-wrap -m-4">
                {/* projectItem */}
                {results.map((project) => (
                  <ProjectItem key={project.id} data={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
