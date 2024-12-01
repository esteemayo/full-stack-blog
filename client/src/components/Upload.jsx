import { toast } from 'react-toastify';
import { useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch(
      'http://localhost:3030/api/v1/posts/upload-auth'
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setData, setProgress }) => {
  const ref = useRef(null);

  const onError = (err) => {
    console.log(err);
    toast.error('Image upload failed!');
  };

  const onSuccess = (res) => {
    console.log(res);
    setData(res);
  };

  const onUploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round(progress.loaded / progress.total) * 100);
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className='hidden'
        ref={ref}
        accept={`${type}/*`}
      />
      <div className='cursor-pointer' onClick={() => ref.current.click}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
