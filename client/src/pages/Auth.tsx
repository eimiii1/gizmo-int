import { useState } from "react";
import { Navigate } from "react-router";

type View = "login" | "register";

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [view, setView] = useState<View>("login");

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#F7F5EF] text-[#172220]">
      <section className="bg-[#1F3A34] text-[#F7F5EF] flex flex-col justify-center px-8 md:px-16 py-16 gap-10">
        <div className="max-w-md">
          <h1 className="font-serif text-3xl md:text-[2.75rem] leading-[1.15] mb-4">
            Study your own notes, quizzed back to you by AI.
          </h1>

          <p className="text-[#F7F5EF]/70 leading-relaxed max-w-sm">
            Turn a deck of flashcards into a quiz in one click. Try the card
            below.
          </p>
        </div>

        <button
          type="button"
          aria-label="Click to flip the flashcard"
          onClick={() => setIsFlipped((previous) => !previous)}
          className="w-full max-w-sm aspect-[4/3] text-left cursor-pointer [perspective:1400px]"
        >
          <div
            className={[
              "relative w-full h-full",
              "[transform-style:preserve-3d]",
              "transition-transform duration-500",
              "ease-[cubic-bezier(.3,.9,.3,1)]",
              isFlipped ? "[transform:rotateY(180deg)]" : "",
            ].join(" ")}
          >
            <div
              className="
                absolute inset-0
                bg-[#F7F5EF] text-[#172220]
                rounded-sm
                p-7
                flex flex-col justify-between
                [backface-visibility:hidden]
              "
            >
              <span className="text-sm text-[#172220]/50">
                Question
              </span>

              <p className="font-serif text-xl md:text-2xl leading-snug">
                What is a binary search tree?
              </p>

              <span className="text-sm text-[#172220]/40">
                Click to flip
              </span>
            </div>

            {/* Back */}
            <div
              className="
                absolute inset-0
                bg-[#C23B32] text-[#F7F5EF]
                rounded-sm
                p-7
                flex flex-col justify-between
                [backface-visibility:hidden]
                [transform:rotateY(180deg)]
              "
            >
              <span className="text-sm text-[#F7F5EF]/70">
                Answer
              </span>

              <p className="font-serif text-xl md:text-2xl leading-snug">
                A tree where each node has at most two children, with left
                nodes smaller and right nodes larger.
              </p>

              <span className="text-sm text-[#F7F5EF]/60">
                Click to flip back
              </span>
            </div>
          </div>
        </button>
      </section>

      <section className="bg-[#F7F5EF] flex items-center justify-center px-8 md:px-16 py-16">
        <div className="w-full max-w-sm">
          {view === "login" ? (
            <LoginForm onRegister={() => setView("register")} />
          ) : (
            <RegisterForm onLogin={() => setView("login")} />
          )}
        </div>
      </section>
    </main>
  );
}


interface LoginFormProps {
  onRegister: () => void;
}

function LoginForm({ onRegister }: LoginFormProps) {
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password')
      })
    })

    if (!response) {
      return
    }

    window.location.href = '/'
    
    const data = await response.json()
    localStorage.setItem('token', data.access_token)
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-serif text-2xl mb-1">
        Welcome back
      </h2>

      <p className="text-[#172220]/60 mb-10">
        Log in to get back to your decks.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm text-[#172220]/70">
            Username
          </span>

          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            className="
              bg-transparent
              border-0 border-b border-[#172220]/15
              pb-2.5
              text-base
              outline-none
              transition
              focus:border-[#C23B32]
            "
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-[#172220]/70">
            Password
          </span>

          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="
              bg-transparent
              border-0 border-b border-[#172220]/15
              pb-2.5
              text-base
              outline-none
              transition
              focus:border-[#C23B32]
            "
          />
        </label>

        <button
          type="submit"
          className="
            mt-2
            bg-[#172220] text-[#F7F5EF]
            text-sm font-medium
            px-5 py-3.5
            rounded-sm
            transition-all duration-200
            hover:bg-[#C23B32]
            hover:-translate-y-0.5
          "
        >
          Log in
        </button>
      </form>

      <p className="mt-8 text-sm text-[#172220]/60">
        No account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="text-[#C23B32] hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  );
}


interface RegisterFormProps {
  onLogin: () => void;
}

function RegisterForm({ onLogin }: RegisterFormProps) {
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
      })
    })
    
    const data = await response.json();
    console.log(data);;
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-serif text-2xl mb-1">
        Create your account
      </h2>

      <p className="text-[#172220]/60 mb-10">
        Start building your first deck.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm text-[#172220]/70">
            Username
          </span>

          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            className="
              bg-transparent
              border-0 border-b border-[#172220]/15
              pb-2.5
              text-base
              outline-none
              transition
              focus:border-[#C23B32]
            "
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-[#172220]/70">
            Email address
          </span>

          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="
              bg-transparent
              border-0 border-b border-[#172220]/15
              pb-2.5
              text-base
              outline-none
              transition
              focus:border-[#C23B32]
            "
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-[#172220]/70">
            Password
          </span>

          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="
              bg-transparent
              border-0 border-b border-[#172220]/15
              pb-2.5
              text-base
              outline-none
              transition
              focus:border-[#C23B32]
            "
          />
        </label>

        <button
          type="submit"
          className="
            mt-2
            bg-[#172220] text-[#F7F5EF]
            text-sm font-medium
            px-5 py-3.5
            rounded-sm
            transition-all duration-200
            hover:bg-[#C23B32]
            hover:-translate-y-0.5
          "
        >
          Create account
        </button>
      </form>

      <p className="mt-8 text-sm text-[#172220]/60">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="text-[#C23B32] hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}