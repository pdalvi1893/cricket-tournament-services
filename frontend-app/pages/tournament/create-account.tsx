import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Label, Button, WindmillContext } from '@roketid/windmill-react-ui';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';

import { API_ENDPOINTS } from '../../constants/api';

function CreateAccount() {
  const { mode } = useContext(WindmillContext);
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const imgSource =
    mode === 'dark'
      ? '/assets/img/create-account-office-dark.jpeg'
      : '/assets/img/create-account-office.jpeg';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!form.agree) {
      setError('You must agree to the privacy policy');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // if (!res.ok) throw new Error('Failed to register');
      // router.push('/example/login');
      await api(API_ENDPOINTS.REGISTER, { method: 'POST', body: { name: form.email, email: form.email, password: form.password } });
      router.push('/tournament/login');
    } catch (err: any) {
      console.log('Before API call'); // should print
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout="fill"
            />
          </div>

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleSubmit}>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>

              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@doe.com"
                  required
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="***************"
                  required
                />
              </Label>

              <Label className="mt-4">
                <span>Confirm password</span>
                <Input
                  className="mt-1"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="***************"
                  required
                />
              </Label>

              <Label className="mt-6" check>
                <Input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

              <Button block className="mt-4" type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create account'}
              </Button>

              <hr className="my-8" />

              <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/tournament/login">
                  <a className="font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Login
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

export default CreateAccount;
