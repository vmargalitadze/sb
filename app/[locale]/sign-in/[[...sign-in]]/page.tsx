import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <>
  <div className="w-full flex justify-center  h-screen mt-[200px] max-w-md mx-auto">

  <SignIn />
  </div>
  
  </>
}