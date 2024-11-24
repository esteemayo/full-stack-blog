const Comments = () => {
  return (
    <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form className='flex items-center justify-between gap-8 w-full'>
        <textarea
          name='desc'
          placeholder='Write a comment...'
          className='w-full p-4 rounded-xl'
        />
        <button className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl capitalize'>
          Send
        </button>
      </form>
    </div>
  );
};

export default Comments;
