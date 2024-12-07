import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';
import ReactQuill from 'react-quill-new';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Upload from '../components/Upload';
import http from '../services/httpService';

import 'react-quill-new/dist/quill.snow.css';

const Write = () => {
  const queryClient = useQueryClient();

  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const navigate = useNavigate();

  const { isError, isPending, error, mutate } = useMutation({
    mutationFn: async (post) => {
      const token = await getToken();
      const { data } = await http.post('/posts', post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post has been created');
      navigate(`/${data.slug}`);
    },
  });

  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');

  const [value, setValue] = useState('');
  const [cover, setCover] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || '',
      title: formData.get('title'),
      desc: formData.get('desc'),
      category: formData.get('category'),
      content: formData.get('content'),
    };

    mutate(data);
  };

  useEffect(() => {
    img &&
      setValue((value) => {
        return `${value}<p><image src='${img.url} /></p>`;
      });
  }, [img]);

  useEffect(() => {
    video &&
      setValue((value) => {
        return `${value}<p><iframe class='ql-video' src='${video.url} /></p>`;
      });
  }, [video]);

  if (!isLoaded) {
    return <div className=''>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className=''>You should login!</div>;
  }

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-cl font-light'>Create a New Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
        <Upload type='image' setData={setCover} setProgress={setProgress}>
          <button
            type='button'
            className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'
          >
            Add a cover image
          </button>
        </Upload>
        <input
          className='text-4xl font-semibold bg-transparent outline-none'
          type='text'
          placeholder='My Awesome Story'
          name='title'
        />
        <div className='flex items-center gap-4'>
          <label htmlFor='' className='text-sm'>
            Choose a category:
          </label>
          <select
            name='category'
            id=''
            className='p-2 rounded-xl bg-white shadow-md'
          >
            <option value='general'>General</option>
            <option value='web-design'>Web Design</option>
            <option value='development'>Development</option>
            <option value='databases'>Databases</option>
            <option value='seo'>Search Engines</option>
            <option value='marketing'>Marketing</option>
          </select>
        </div>
        <textarea
          className='p-4 rounded-xl bg-white shadow-md outline-0 resize-none'
          name='desc'
          placeholder='A Short Description'
        />
        <div className='flex flex-1'>
          <div className='flex flex-col gap-2 mr-2'>
            <Upload type='image' setData={setImg} setProgress={setProgress}>
              🌆
            </Upload>
            <Upload type='video' setData={setVideo} setProgress={setProgress}>
              ▶️
            </Upload>
          </div>
          <ReactQuill
            theme='snow'
            className='flex-1 rounded-xl bg-white shadow-md'
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          type='submit'
          disabled={!!isPending || (0 < progress && progress < 100)}
          className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'
        >
          {isPending ? 'Loading...' : 'Send'}
        </button>
        {`Progress: ${progress}`}
        {!!isError && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
