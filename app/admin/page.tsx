
import { auth, currentUser } from '@clerk/nextjs/server'
import AdminHelper from './AdminHelper'
export default async function Page() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  

  const user = await currentUser();
  const admin = user?.privateMetadata?.role === "admin";
  
  if (!admin) return redirectToSignIn();
  return (
<>

    <AdminHelper />
      
        </>

  );
}
