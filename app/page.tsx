import Hero from "@/components/hero";
import QuotePage from "@/components/quote-page";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Index() {
  return (
    <>
      <main className="px-4">
        <QuotePage/>
      </main>
    </>
  );
}
