import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Node Based Planner</title>
                <meta
                    name="description"
                    content="A planner for all things TTRPG"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Welcome to Node Based Planner!</h1>
            </main>
        </div>
    );
}
