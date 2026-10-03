import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5000";

interface User {
    username: string;
    email?: string;
}

interface Deck {
    id: number;
    title: string;
    description?: string;
    card_count: number;
    updated_at?: string;
}

export default function MainPage() {
    const [user, setUser] = useState<User | null>(null);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPage() {
            const token = localStorage.getItem("token");

            if (!token) {
                window.location.href = "/auth";
                return;
            }

            try {
                const [userResponse, decksResponse] = await Promise.all([
                    fetch(`${API_URL}/api/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),

                    fetch(`${API_URL}/api/decks`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                if (userResponse.status === 401 || decksResponse.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/auth";
                    return;
                }

                if (!userResponse.ok || !decksResponse.ok) {
                    throw new Error("Unable to load your workspace.");
                }

                const userData = await userResponse.json();
                const decksData = await decksResponse.json();

                setUser(userData);
                setDecks(decksData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadPage();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.href = "/auth";
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <main className="min-h-screen bg-paper text-ink">
            {/* ---------------------------------------------------------------- */}
            {/* Navigation                                                       */}
            {/* ---------------------------------------------------------------- */}

            <header className="border-b border-ink/8">
                <nav className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                    <a
                        href="/"
                        className="
              font-display
              text-xl
              tracking-[-0.02em]
              transition-opacity
              hover:opacity-60
            "
                    >
                        Recall
                    </a>

                    <div className="flex items-center gap-6">
                        <span className="hidden sm:block text-sm text-ink/45">
                            {user?.username}
                        </span>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                text-xs
                uppercase
                tracking-[0.12em]
                text-ink/45
                transition-colors
                hover:text-terracotta
              "
                        >
                            Log out
                        </button>
                    </div>
                </nav>
            </header>

            {/* ---------------------------------------------------------------- */}
            {/* Main                                                             */}
            {/* ---------------------------------------------------------------- */}

            <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
                {/* Hero */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-ink/35 mb-5">
                            Your workspace
                        </p>

                        <h1 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.025em]">
                            Good to see you,
                            <br />
                            <span className="text-terracotta">
                                {user?.username}.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-md text-ink/55 leading-relaxed">
                            Pick up where you left off, or create a new deck and start
                            turning your notes into active recall.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="
              self-start
              md:self-auto
              flex
              items-center
              gap-3
              bg-ink
              text-paper
              px-5
              py-3.5
              rounded-[2px]
              text-sm
              font-medium
              transition-all
              duration-200
              hover:bg-terracotta
              hover:-translate-y-0.5
              active:translate-y-0
            "
                    >
                        <span className="text-lg leading-none">+</span>
                        New deck
                    </button>
                </section>

                {/* ---------------------------------------------------------------- */}
                {/* Stats                                                            */}
                {/* ---------------------------------------------------------------- */}

                <section className="grid grid-cols-2 md:grid-cols-4 border-y border-ink/10 mb-16">
                    <Stat
                        label="Decks"
                        value={decks.length.toString()}
                    />

                    <Stat
                        label="Cards"
                        value={decks
                            .reduce((total, deck) => total + deck.card_count, 0)
                            .toString()}
                    />

                    <Stat
                        label="Reviews"
                        value="—"
                    />

                    <Stat
                        label="Streak"
                        value="—"
                    />
                </section>

                {/* ---------------------------------------------------------------- */}
                {/* Decks                                                            */}
                {/* ---------------------------------------------------------------- */}

                <section>
                    <div className="flex items-end justify-between mb-7">
                        <div>
                            <p className="text-xs uppercase tracking-[0.16em] text-ink/35 mb-2">
                                Library
                            </p>

                            <h2 className="font-display text-2xl">
                                Your decks
                            </h2>
                        </div>

                        {decks.length > 0 && (
                            <button
                                type="button"
                                className="
                  hidden sm:block
                  text-sm
                  text-ink/45
                  transition-colors
                  hover:text-terracotta
                "
                            >
                                View all →
                            </button>
                        )}
                    </div>

                    {decks.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {decks.map((deck) => (
                                <DeckCard
                                    key={deck.id}
                                    deck={deck}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

/* -------------------------------------------------------------------------- */
/* Stat                                                                       */
/* -------------------------------------------------------------------------- */

interface StatProps {
    label: string;
    value: string;
}

function Stat({ label, value }: StatProps) {
    return (
        <div className="py-6 pr-6 md:py-7">
            <p className="text-xs uppercase tracking-[0.13em] text-ink/35 mb-2">
                {label}
            </p>

            <p className="font-display text-2xl md:text-3xl">
                {value}
            </p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Deck Card                                                                  */
/* -------------------------------------------------------------------------- */

interface DeckCardProps {
    deck: Deck;
}

function DeckCard({ deck }: DeckCardProps) {
    return (
        <article
            className="
        group
        relative
        min-h-[230px]
        border
        border-ink/10
        bg-paper
        p-6
        flex
        flex-col
        justify-between
        cursor-pointer
        transition-all
        duration-300
        hover:border-ink/25
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(23,34,32,0.07)]
      "
        >
            <div className="flex items-start justify-between gap-4">
                <span
                    className="
            inline-flex
            px-2.5
            py-1
            bg-forest/8
            text-forest
            text-[10px]
            uppercase
            tracking-[0.12em]
          "
                >
                    {deck.card_count} cards
                </span>

                <button
                    type="button"
                    aria-label={`More options for ${deck.title}`}
                    className="
            text-ink/25
            text-xl
            leading-none
            transition-colors
            hover:text-terracotta
          "
                >
                    ···
                </button>
            </div>

            <div>
                <h3
                    className="
            font-display
            text-2xl
            leading-tight
            mb-2
            transition-colors
            group-hover:text-terracotta
          "
                >
                    {deck.title}
                </h3>

                {deck.description && (
                    <p className="text-sm text-ink/50 leading-relaxed line-clamp-2">
                        {deck.description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-ink/8">
                <span className="text-xs text-ink/35">
                    {deck.updated_at
                        ? `Updated ${deck.updated_at}`
                        : "Ready to study"}
                </span>

                <span
                    className="
            text-sm
            text-ink/40
            transition-all
            duration-200
            group-hover:text-terracotta
            group-hover:translate-x-1
          "
                >
                    →
                </span>
            </div>
        </article>
    );
}

/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState() {
    return (
        <div
            className="
        border
        border-dashed
        border-ink/15
        min-h-[300px]
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
      "
        >
            <div
                className="
          w-12
          h-12
          border
          border-ink/15
          flex
          items-center
          justify-center
          mb-6
          text-xl
          text-ink/40
        "
            >
                +
            </div>

            <h3 className="font-display text-xl mb-2">
                Nothing here yet.
            </h3>

            <p className="text-sm text-ink/45 max-w-xs leading-relaxed mb-6">
                Create your first deck and start turning your notes into something
                you can actually remember.
            </p>

            <button
                type="button"
                className="
          text-sm
          text-terracotta
          hover:text-ink
          transition-colors
          underline
          underline-offset-4
        "
            >
                Create your first deck
            </button>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                     */
/* -------------------------------------------------------------------------- */

function LoadingScreen() {
    return (
        <main className="min-h-screen bg-paper flex items-center justify-center">
            <div className="flex items-center gap-3 text-ink/40">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />

                <span className="text-xs uppercase tracking-[0.16em]">
                    Loading workspace
                </span>
            </div>
        </main>
    );
}