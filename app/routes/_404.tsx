import type { NotFoundHandler } from 'hono';

const handler: NotFoundHandler = (c) => {
  return c.render(
    <div className="container flex min-h-[calc(100vh-16rem)] max-w-screen-lg flex-col items-center justify-center">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
        <h1 className="from-foreground to-foreground/50 bg-gradient-to-b bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
          404
        </h1>
        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Not Found</h2>
        </div>
        <div className="mt-8 text-8xl font-bold opacity-10">{':('}</div>
      </div>
    </div>
  );
};

export default handler;
