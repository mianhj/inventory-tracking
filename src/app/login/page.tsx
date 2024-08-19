import { LoginForm } from './components/LoginForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
function Login() {
  const token = cookies().get('Authorization')?.value;
  if (token) {
    redirect('/');
  }

  return (
    <>
      <div className="container relative h-[200px] lg:h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative h-full hidden flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight mt-5 lg:mt-0">
                Login
              </h1>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
