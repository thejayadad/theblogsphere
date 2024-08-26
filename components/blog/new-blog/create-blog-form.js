'use client'
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/lib/actions/blog/create-blog';

// Validation schemas for each step
const stepOneSchema = yup.object().shape({
  name: yup.string().required('Blog name is required'),
});

const stepTwoSchema = yup.object().shape({
  blogUrl: yup.string().required('Blog URL is required')
});

const CreateBlogForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Use FormProvider to handle multi-step form with different validations
  const methods = useForm({
    resolver: yupResolver(step === 1 ? stepOneSchema : stepTwoSchema),
    mode: 'onChange',
  });

  const { handleSubmit, register, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    if (step === 1) {
      // Move to the next step
      setStep(2);
    } else {
      // Final step - create blog
      setLoading(true);
      try {
        const newBlog = await createBlog(data); // Assumes this function returns the created blog object
        toast.success('Blog created successfully!');
        router.push(`/blog/${newBlog.id}`); // Redirect to the blog detail page
      } catch (error) {
        toast.error('Failed to create blog. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Blog Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label htmlFor="blogUrl" className="block text-sm font-medium text-gray-700">
                Blog URL
              </label>
              <input
                id="blogUrl"
                type="text"
                {...register('blogUrl')}
                className={`mt-1 block w-full border ${errors.blogUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              />
              {errors.blogUrl && <p className="text-red-500 text-sm">{errors.blogUrl.message}</p>}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`bg-green-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBlogForm;
