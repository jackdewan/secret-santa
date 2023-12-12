type TFormDataFunction = (arg0: FormData) => void;

type FormLoginProps = {
  signIn: TFormDataFunction;
  signUp: TFormDataFunction;
  searchParams: {
    message: string;
  } | null;
};

export const FormLogin = ({ signIn, signUp, searchParams }: FormLoginProps) => {
  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={signIn}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-black/30 border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-black/30 border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
        Sign In
      </button>
      <button
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
      >
        Sign Up
      </button>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
};
