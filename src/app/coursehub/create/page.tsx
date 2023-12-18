'use client';

import { useState } from 'react';

const createFormDataFromObject = (data: any, formData = new FormData(), parentKey = '') => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File) {
        formData.append(newKey, value);
      } else if (value instanceof Object) {
        createFormDataFromObject(value, formData, newKey);
      } else {
        formData.append(newKey, value);
      }
    }
  }
  return formData;
};

let dataToSend: any = {
  title: 'Web Dengan NESTJS',
  description: 'description',
  telegram_group: 'telegram.com',
  price: '0',
  category_id: '1',
  requirements: ['Dasar Javascript', 'Dasar Typescript'],
  level: 'beginner',
  author: 'Taufik',
  chapters: [
    {
      name: 'Introducetion to Nest js',
      modules: [
        { title: 'Step 1', duration: '120', url: 'Youtube.com', isTrailer: 'true' },
        { title: 'Step 2', duration: '120', url: 'Youtube.com' },
      ],
    },
    {
      name: 'Introducetion to Nest js 2',
      modules: [{ title: 'Step 1', duration: '120', url: 'Youtube.com' }],
    },
  ],
};
const Page = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (file) {
        dataToSend = {
          ...dataToSend,
          image: file,
        };
        const formDataToSend = createFormDataFromObject(dataToSend);

        const data = await fetch('http://localhost:3000/api/v1/courses', {
          method: 'POST',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRBZG1pbiI6ImFkbWluLWNvdXJzZS1odWIiLCJpYXQiOjE3MDI5MDM3OTUsImV4cCI6MTcwMjk5MDE5NX0.-7Uja6TaochIiBxFJeIRna-DpVwYHCE9VGgxCi0BNS4`,
          },
          body: formDataToSend,
        });

        const response = await data.json();

        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image: </label>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
