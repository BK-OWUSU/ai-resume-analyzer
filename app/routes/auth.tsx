import { usePuterStore } from "lib/puter"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
  {title: "Resunalyzer | Auth"},
  {name: "description", content:"Log into you Account"}
])
const auth = () => {
  const {isLoading, auth} = usePuterStore();
  const location = useLocation();
  const nextPage = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(()=> {
    if (auth.isAuthenticated) navigate(nextPage);
  },[auth.isAuthenticated, nextPage])
  
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover  min-h-screen flex justify-center items-center">
       <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In To Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? 
            (<button className="auth-button animate-pulse">
              Signing You In...
            </button>) : 
            (<div>
              {auth.isAuthenticated ? 
              (<button className="auth-button" onClick={auth.signOut}>
                Sign Out 
              </button>): 
              (<button className="auth-button" onClick={auth.signIn}>
                Sign In 
              </button>)
            }
            </div>)}
          </div>
        </section>
       </div>
    </main>
  )
}

export default auth