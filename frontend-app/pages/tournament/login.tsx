import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';

import { Label, Input, Button, WindmillContext } from '@roketid/windmill-react-ui'

import { API_ENDPOINTS } from '../../constants/api';

function LoginPage() {
  const { mode } = useContext(WindmillContext)

  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const imgSource = mode === 'dark' ? '/assets/img/login-office-dark.jpeg' : '/assets/img/login-office.jpeg'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Server request');
    e.preventDefault();

    if (!form.password) {
      setError('Password not entered.');
      return;
    }
    if (!form.email) {
      setError('Email not entered.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await api(API_ENDPOINTS.LOGIN, { method: 'POST', body: { email: form.email, password: form.password } });
      //if (!result.ok) throw new Error('Failed to login');
      router.push('/tournament/tables');
    } catch (err: any) {
      console.log('Before API call'); // should print
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='relative h-32 md:h-auto md:w-1/2'>
            <Image
              aria-hidden='true'
              className='hidden object-cover w-full h-full'
              src={imgSource}
              alt='Office'
              layout='fill'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <form className='w-full' onSubmit={handleSubmit}>
              <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className='mt-1'
                  type='email'
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@doe.com"
                  required
                />
              </Label>

              <Label className='mt-4'>
                <span>Password</span>
                <Input
                  className='mt-1'
                  type='password'
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="***************"
                  required
                />
              </Label>

              {/* <Link href='/example' passHref={true}>
                <Button className='mt-4' block>
                  Log in
                </Button>
              </Link> */}
              <Button block className="mt-4" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <hr className='my-8' />

              <p className='mt-4'>
                {/* <Link href='/example/forgot-password'>
                  <a className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline'>
                    Forgot your password?
                  </a>
                </Link> */}
              </p>
              <p className='mt-1'>
                <Link href='/tournament/create-account'>
                  <a className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline'>
                    Create account
                  </a>
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
