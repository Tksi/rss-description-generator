import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { validator } from 'hono/validator';
import { replaceDescription } from 'lib/replaceDescription';
import * as v from 'valibot';
import { renderer } from './renderer';

type Bindings = {
  KV: KVNamespace;
};

export type ENV = {
  JINA_API_KEY: string;
  GEMINI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>);
});

const schema = v.object({
  unixTime: v.pipe(
    v.string(),
    v.transform(Number),
    v.number(),
    v.safeInteger(),
  ),
  rssUrl: v.pipe(v.string(), v.url()),
});

app.get(
  '/:unixTime/:rssUrl{.+$}',
  validator('param', async (value, c) => {
    const result = v.safeParse(schema, value);

    if (!result.success) {
      return c.json(result.issues, 422);
    }

    // let rss: Awaited<ReturnType<(typeof parser)['parseURL']>>;
    let rss;

    try {
      // rss = await parser.parseURL(result.output.rssUrl);
      rss = {
        items: [
          {
            creator: 'ekTHEN',
            title: 'Serpent OS Prealpha0 Released',
            link: 'https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/',
            pubDate: 'Sun, 25 Aug 2024 01:10:13 +0000',
            'dc:creator': 'ekTHEN',
            comments: 'https://news.ycombinator.com/item?id=41343444',
            content:
              '\n<p>Article URL: <a href="https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/">https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41343444">https://news.ycombinator.com/item?id=41343444</a></p>\n<p>Points: 13</p>\n<p># Comments: 7</p>\n',
            contentSnippet:
              'Article URL: https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/\nComments URL: https://news.ycombinator.com/item?id=41343444\nPoints: 13\n# Comments: 7',
            guid: 'https://news.ycombinator.com/item?id=41343444',
            isoDate: '2024-08-25T01:10:13.000Z',
          },
          {
            creator: 'zdw',
            title: 'Looming Liability Machines (LLMs)',
            link: 'http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html',
            pubDate: 'Sun, 25 Aug 2024 00:05:44 +0000',
            'dc:creator': 'zdw',
            comments: 'https://news.ycombinator.com/item?id=41343024',
            content:
              '\n<p>Article URL: <a href="http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html">http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41343024">https://news.ycombinator.com/item?id=41343024</a></p>\n<p>Points: 31</p>\n<p># Comments: 25</p>\n',
            contentSnippet:
              'Article URL: http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html\nComments URL: https://news.ycombinator.com/item?id=41343024\nPoints: 31\n# Comments: 25',
            guid: 'https://news.ycombinator.com/item?id=41343024',
            isoDate: '2024-08-25T00:05:44.000Z',
          },
          {
            creator: 'akyuu',
            title: 'Defenders think in lists, attackers think in graphs (2015)',
            link: 'https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md',
            pubDate: 'Sat, 24 Aug 2024 23:12:18 +0000',
            'dc:creator': 'akyuu',
            comments: 'https://news.ycombinator.com/item?id=41342637',
            content:
              '\n<p>Article URL: <a href="https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md">https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41342637">https://news.ycombinator.com/item?id=41342637</a></p>\n<p>Points: 107</p>\n<p># Comments: 35</p>\n',
            contentSnippet:
              'Article URL: https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md\nComments URL: https://news.ycombinator.com/item?id=41342637\nPoints: 107\n# Comments: 35',
            guid: 'https://news.ycombinator.com/item?id=41342637',
            isoDate: '2024-08-24T23:12:18.000Z',
          },
          {
            creator: 'david927',
            title: 'Ask HN: What are you working on (August 2024)?',
            link: 'https://news.ycombinator.com/item?id=41342017',
            pubDate: 'Sat, 24 Aug 2024 22:00:34 +0000',
            'dc:creator': 'david927',
            comments: 'https://news.ycombinator.com/item?id=41342017',
            content:
              '\n<p>What are you working on? Any new ideas that you\'re thinking about?</p>\n<hr>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41342017">https://news.ycombinator.com/item?id=41342017</a></p>\n<p>Points: 194</p>\n<p># Comments: 421</p>\n',
            contentSnippet:
              "What are you working on? Any new ideas that you're thinking about?\nComments URL: https://news.ycombinator.com/item?id=41342017\nPoints: 194\n# Comments: 421",
            guid: 'https://news.ycombinator.com/item?id=41342017',
            isoDate: '2024-08-24T22:00:34.000Z',
          },
          {
            creator: 'lampysecurity',
            title: 'Birds aren\'t real – how to create your own "bird"',
            link: 'https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird',
            pubDate: 'Sat, 24 Aug 2024 21:41:21 +0000',
            'dc:creator': 'lampysecurity',
            comments: 'https://news.ycombinator.com/item?id=41341817',
            content:
              '\n<p>Article URL: <a href="https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird">https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341817">https://news.ycombinator.com/item?id=41341817</a></p>\n<p>Points: 29</p>\n<p># Comments: 14</p>\n',
            contentSnippet:
              'Article URL: https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird\nComments URL: https://news.ycombinator.com/item?id=41341817\nPoints: 29\n# Comments: 14',
            guid: 'https://news.ycombinator.com/item?id=41341817',
            isoDate: '2024-08-24T21:41:21.000Z',
          },
          {
            creator: 'smartmic',
            title: 'Papersway – a scrollable window management for Sway/i3wm',
            link: 'https://spwhitton.name/tech/code/papersway/',
            pubDate: 'Sat, 24 Aug 2024 21:39:39 +0000',
            'dc:creator': 'smartmic',
            comments: 'https://news.ycombinator.com/item?id=41341797',
            content:
              '\n<p>Article URL: <a href="https://spwhitton.name/tech/code/papersway/">https://spwhitton.name/tech/code/papersway/</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341797">https://news.ycombinator.com/item?id=41341797</a></p>\n<p>Points: 88</p>\n<p># Comments: 18</p>\n',
            contentSnippet:
              'Article URL: https://spwhitton.name/tech/code/papersway/\nComments URL: https://news.ycombinator.com/item?id=41341797\nPoints: 88\n# Comments: 18',
            guid: 'https://news.ycombinator.com/item?id=41341797',
            isoDate: '2024-08-24T21:39:39.000Z',
          },
          {
            creator: 'luyu_wu',
            title: "AMD's Radeon 890M: Strix Point's Bigger iGPU",
            link: 'https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/',
            pubDate: 'Sat, 24 Aug 2024 21:39:07 +0000',
            'dc:creator': 'luyu_wu',
            comments: 'https://news.ycombinator.com/item?id=41341786',
            content:
              '\n<p>Article URL: <a href="https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/">https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341786">https://news.ycombinator.com/item?id=41341786</a></p>\n<p>Points: 59</p>\n<p># Comments: 3</p>\n',
            contentSnippet:
              'Article URL: https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/\nComments URL: https://news.ycombinator.com/item?id=41341786\nPoints: 59\n# Comments: 3',
            guid: 'https://news.ycombinator.com/item?id=41341786',
            isoDate: '2024-08-24T21:39:07.000Z',
          },
          {
            creator: 'NoxiousPluK',
            title: 'Telegram founder Pavel Durov arrested at French airport',
            link: 'https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport',
            pubDate: 'Sat, 24 Aug 2024 20:46:00 +0000',
            'dc:creator': 'NoxiousPluK',
            comments: 'https://news.ycombinator.com/item?id=41341353',
            content:
              '\n<p>Article URL: <a href="https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport">https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341353">https://news.ycombinator.com/item?id=41341353</a></p>\n<p>Points: 668</p>\n<p># Comments: 548</p>\n',
            contentSnippet:
              'Article URL: https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport\nComments URL: https://news.ycombinator.com/item?id=41341353\nPoints: 668\n# Comments: 548',
            guid: 'https://news.ycombinator.com/item?id=41341353',
            isoDate: '2024-08-24T20:46:00.000Z',
          },
          {
            creator: 'Bluestein',
            title: 'The Vital Necessity of Very Old Books (2023)',
            link: 'https://www.millersbookreview.com/p/vital-necessity-of-very-old-books',
            pubDate: 'Sat, 24 Aug 2024 19:49:25 +0000',
            'dc:creator': 'Bluestein',
            comments: 'https://news.ycombinator.com/item?id=41340948',
            content:
              '\n<p>Article URL: <a href="https://www.millersbookreview.com/p/vital-necessity-of-very-old-books">https://www.millersbookreview.com/p/vital-necessity-of-very-old-books</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41340948">https://news.ycombinator.com/item?id=41340948</a></p>\n<p>Points: 36</p>\n<p># Comments: 10</p>\n',
            contentSnippet:
              'Article URL: https://www.millersbookreview.com/p/vital-necessity-of-very-old-books\nComments URL: https://news.ycombinator.com/item?id=41340948\nPoints: 36\n# Comments: 10',
            guid: 'https://news.ycombinator.com/item?id=41340948',
            isoDate: '2024-08-24T19:49:25.000Z',
          },
          {
            creator: 'Hacktrick',
            title:
              'Show HN: High school robotics code/CAD/design binder release',
            link: 'https://www.chiefdelphi.com/t/team-341-miss-daisy-2024-cad-code-and-design-binder-release/467546',
            pubDate: 'Sat, 24 Aug 2024 19:40:18 +0000',
            'dc:creator': 'Hacktrick',
            comments: 'https://news.ycombinator.com/item?id=41340874',
            content:
              '\n<p>Hello HN!<p>My name is Patrick, and I am a junior at my High School’s FRC robotics team FRC 341 “Miss Daisy” (yes named after the movie). Every year, during the first weekend in January, a new robotics game is released (no it’s not battlebots). The game could be about launching balls into a goal, climbing monkeybars, or placing cubes on a see-saw. This year we were challenged to build a robot that could shoot orange foam donuts into a goal about 6 feet in the air. Here is a yt video with the game animation <a href="https://www.youtube.com/watch?v=9keeDyFxzY4&t" rel="nofollow">https://www.youtube.com/watch?v=9keeDyFxzY4&t</a>. After we received the game we then had six weeks to design, build, program, and field a robot capable of playing the game. And we did pretty well this year! I have attached a ChiefDelphi thread (robotics forum) where we have released our season materials. This being our CAD (3D model of robot), code, and design binder. I encourage you to take a look and leave any questions that you may have.<p>Thanks a lot!</p>\n<hr>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41340874">https://news.ycombinator.com/item?id=41340874</a></p>\n<p>Points: 41</p>\n<p># Comments: 13</p>\n',
            contentSnippet:
              'Hello HN!\nMy name is Patrick, and I am a junior at my High School’s FRC robotics team FRC 341 “Miss Daisy” (yes named after the movie). Every year, during the first weekend in January, a new robotics game is released (no it’s not battlebots). The game could be about launching balls into a goal, climbing monkeybars, or placing cubes on a see-saw. This year we were challenged to build a robot that could shoot orange foam donuts into a goal about 6 feet in the air. Here is a yt video with the game animation https://www.youtube.com/watch?v=9keeDyFxzY4&t. After we received the game we then had six weeks to design, build, program, and field a robot capable of playing the game. And we did pretty well this year! I have attached a ChiefDelphi thread (robotics forum) where we have released our season materials. This being our CAD (3D model of robot), code, and design binder. I encourage you to take a look and leave any questions that you may have.\nThanks a lot!\nComments URL: https://news.ycombinator.com/item?id=41340874\nPoints: 41\n# Comments: 13',
            guid: 'https://news.ycombinator.com/item?id=41340874',
            isoDate: '2024-08-24T19:40:18.000Z',
          },
          {
            creator: 'hu3',
            title: 'Golang Interpreter Written in PHP',
            link: 'https://github.com/tuqqu/go-php',
            pubDate: 'Sat, 24 Aug 2024 17:34:13 +0000',
            'dc:creator': 'hu3',
            comments: 'https://news.ycombinator.com/item?id=41339818',
            content:
              '\n<p>Article URL: <a href="https://github.com/tuqqu/go-php">https://github.com/tuqqu/go-php</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339818">https://news.ycombinator.com/item?id=41339818</a></p>\n<p>Points: 91</p>\n<p># Comments: 34</p>\n',
            contentSnippet:
              'Article URL: https://github.com/tuqqu/go-php\nComments URL: https://news.ycombinator.com/item?id=41339818\nPoints: 91\n# Comments: 34',
            guid: 'https://news.ycombinator.com/item?id=41339818',
            isoDate: '2024-08-24T17:34:13.000Z',
          },
          {
            creator: 'ripjaygn',
            title:
              'NASA announces Boeing Starliner crew will return on SpaceX Crew-9',
            link: 'https://twitter.com/NASA/status/1827393397939634503',
            pubDate: 'Sat, 24 Aug 2024 17:14:09 +0000',
            'dc:creator': 'ripjaygn',
            comments: 'https://news.ycombinator.com/item?id=41339667',
            content:
              '\n<p>Article URL: <a href="https://twitter.com/NASA/status/1827393397939634503">https://twitter.com/NASA/status/1827393397939634503</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339667">https://news.ycombinator.com/item?id=41339667</a></p>\n<p>Points: 374</p>\n<p># Comments: 520</p>\n',
            contentSnippet:
              'Article URL: https://twitter.com/NASA/status/1827393397939634503\nComments URL: https://news.ycombinator.com/item?id=41339667\nPoints: 374\n# Comments: 520',
            guid: 'https://news.ycombinator.com/item?id=41339667',
            isoDate: '2024-08-24T17:14:09.000Z',
          },
          {
            creator: 'jfudem',
            title: 'OneText (YC W23) Is Hiring a Chief of Staff',
            link: 'https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff',
            pubDate: 'Sat, 24 Aug 2024 17:00:05 +0000',
            'dc:creator': 'jfudem',
            comments: 'https://news.ycombinator.com/item?id=41339577',
            content:
              '\n<p>Article URL: <a href="https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff">https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339577">https://news.ycombinator.com/item?id=41339577</a></p>\n<p>Points: 0</p>\n<p># Comments: 0</p>\n',
            contentSnippet:
              'Article URL: https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff\nComments URL: https://news.ycombinator.com/item?id=41339577\nPoints: 0\n# Comments: 0',
            guid: 'https://news.ycombinator.com/item?id=41339577',
            isoDate: '2024-08-24T17:00:05.000Z',
          },
          {
            creator: 'thunderbong',
            title: 'JavaScript dates are about to be fixed',
            link: 'https://docs.timetime.in/blog/js-dates-finally-fixed',
            pubDate: 'Sat, 24 Aug 2024 16:47:12 +0000',
            'dc:creator': 'thunderbong',
            comments: 'https://news.ycombinator.com/item?id=41339493',
            content:
              '\n<p>Article URL: <a href="https://docs.timetime.in/blog/js-dates-finally-fixed">https://docs.timetime.in/blog/js-dates-finally-fixed</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339493">https://news.ycombinator.com/item?id=41339493</a></p>\n<p>Points: 308</p>\n<p># Comments: 230</p>\n',
            contentSnippet:
              'Article URL: https://docs.timetime.in/blog/js-dates-finally-fixed\nComments URL: https://news.ycombinator.com/item?id=41339493\nPoints: 308\n# Comments: 230',
            guid: 'https://news.ycombinator.com/item?id=41339493',
            isoDate: '2024-08-24T16:47:12.000Z',
          },
          {
            creator: 'Jonathanfishner',
            title: 'Show HN: Visualize database schemas with a single query',
            link: 'https://github.com/chartdb/chartdb',
            pubDate: 'Sat, 24 Aug 2024 16:23:46 +0000',
            'dc:creator': 'Jonathanfishner',
            comments: 'https://news.ycombinator.com/item?id=41339308',
            content:
              '\n<p>Hey HN! We are Jonathan & Guy, and we are happy to share a project we’ve been working on. ChartDB is a tool to help developers and data analysts quickly visualize database schemas by generating ER diagrams with just one query. \nA unique feature of our product is AI-Powered export for easy migration. \nYou can give it a try at <a href="https://chartdb.io" rel="nofollow">https://chartdb.io</a> and find the source code on GitHub.\nNext steps ---> More AI. \nWe’d love feedback :)</p>\n<hr>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339308">https://news.ycombinator.com/item?id=41339308</a></p>\n<p>Points: 138</p>\n<p># Comments: 38</p>\n',
            contentSnippet:
              'Hey HN! We are Jonathan & Guy, and we are happy to share a project we’ve been working on. ChartDB is a tool to help developers and data analysts quickly visualize database schemas by generating ER diagrams with just one query. \nA unique feature of our product is AI-Powered export for easy migration. \nYou can give it a try at https://chartdb.io and find the source code on GitHub.\nNext steps ---> More AI. \nWe’d love feedback :)\nComments URL: https://news.ycombinator.com/item?id=41339308\nPoints: 138\n# Comments: 38',
            guid: 'https://news.ycombinator.com/item?id=41339308',
            isoDate: '2024-08-24T16:23:46.000Z',
          },
          {
            creator: 'yoknapathawa',
            title: 'Foundation for Human Vision Models',
            link: 'https://github.com/facebookresearch/sapiens',
            pubDate: 'Sat, 24 Aug 2024 16:04:28 +0000',
            'dc:creator': 'yoknapathawa',
            comments: 'https://news.ycombinator.com/item?id=41339163',
            content:
              '\n<p>Article URL: <a href="https://github.com/facebookresearch/sapiens">https://github.com/facebookresearch/sapiens</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339163">https://news.ycombinator.com/item?id=41339163</a></p>\n<p>Points: 58</p>\n<p># Comments: 10</p>\n',
            contentSnippet:
              'Article URL: https://github.com/facebookresearch/sapiens\nComments URL: https://news.ycombinator.com/item?id=41339163\nPoints: 58\n# Comments: 10',
            guid: 'https://news.ycombinator.com/item?id=41339163',
            isoDate: '2024-08-24T16:04:28.000Z',
          },
          {
            creator: 'legrangramgroum',
            title: 'Pipe Syntax in SQL',
            link: 'https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/',
            pubDate: 'Sat, 24 Aug 2024 15:15:04 +0000',
            'dc:creator': 'legrangramgroum',
            comments: 'https://news.ycombinator.com/item?id=41338877',
            content:
              '\n<p>Article URL: <a href="https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/">https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338877">https://news.ycombinator.com/item?id=41338877</a></p>\n<p>Points: 239</p>\n<p># Comments: 164</p>\n',
            contentSnippet:
              'Article URL: https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/\nComments URL: https://news.ycombinator.com/item?id=41338877\nPoints: 239\n# Comments: 164',
            guid: 'https://news.ycombinator.com/item?id=41338877',
            isoDate: '2024-08-24T15:15:04.000Z',
          },
          {
            creator: 'airstrike',
            title: 'Small Strings in Rust: smolstr vs. smartstring',
            link: 'https://fasterthanli.me/articles/small-strings-in-rust',
            pubDate: 'Sat, 24 Aug 2024 14:58:33 +0000',
            'dc:creator': 'airstrike',
            comments: 'https://news.ycombinator.com/item?id=41338776',
            content:
              '\n<p>Article URL: <a href="https://fasterthanli.me/articles/small-strings-in-rust">https://fasterthanli.me/articles/small-strings-in-rust</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338776">https://news.ycombinator.com/item?id=41338776</a></p>\n<p>Points: 144</p>\n<p># Comments: 53</p>\n',
            contentSnippet:
              'Article URL: https://fasterthanli.me/articles/small-strings-in-rust\nComments URL: https://news.ycombinator.com/item?id=41338776\nPoints: 144\n# Comments: 53',
            guid: 'https://news.ycombinator.com/item?id=41338776',
            isoDate: '2024-08-24T14:58:33.000Z',
          },
          {
            creator: 'robpruzan',
            title: 'Implementing React from Scratch',
            link: 'https://www.rob.directory/blog/react-from-scratch',
            pubDate: 'Sat, 24 Aug 2024 14:50:31 +0000',
            'dc:creator': 'robpruzan',
            comments: 'https://news.ycombinator.com/item?id=41338729',
            content:
              '\n<p>Article URL: <a href="https://www.rob.directory/blog/react-from-scratch">https://www.rob.directory/blog/react-from-scratch</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338729">https://news.ycombinator.com/item?id=41338729</a></p>\n<p>Points: 105</p>\n<p># Comments: 7</p>\n',
            contentSnippet:
              'Article URL: https://www.rob.directory/blog/react-from-scratch\nComments URL: https://news.ycombinator.com/item?id=41338729\nPoints: 105\n# Comments: 7',
            guid: 'https://news.ycombinator.com/item?id=41338729',
            isoDate: '2024-08-24T14:50:31.000Z',
          },
          {
            creator: 'klaussilveira',
            title: 'Julius: Open-source reimplementation of Caesar III',
            link: 'https://github.com/bvschaik/julius',
            pubDate: 'Sat, 24 Aug 2024 14:40:21 +0000',
            'dc:creator': 'klaussilveira',
            comments: 'https://news.ycombinator.com/item?id=41338661',
            content:
              '\n<p>Article URL: <a href="https://github.com/bvschaik/julius">https://github.com/bvschaik/julius</a></p>\n<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338661">https://news.ycombinator.com/item?id=41338661</a></p>\n<p>Points: 100</p>\n<p># Comments: 11</p>\n',
            contentSnippet:
              'Article URL: https://github.com/bvschaik/julius\nComments URL: https://news.ycombinator.com/item?id=41338661\nPoints: 100\n# Comments: 11',
            guid: 'https://news.ycombinator.com/item?id=41338661',
            isoDate: '2024-08-24T14:40:21.000Z',
          },
        ],
        feedUrl: 'https://hnrss.org/frontpage',
        paginationLinks: {
          self: 'https://hnrss.org/frontpage',
        },
        title: 'Hacker News: Front Page',
        description: 'Hacker News RSS',
        generator: 'hnrss v2.1.1',
        link: 'https://news.ycombinator.com/',
        lastBuildDate: 'Sun, 25 Aug 2024 03:34:27 +0000',
        docs: 'https://hnrss.org/',
      };
    } catch (err) {
      if (err instanceof Error) {
        return c.json({ rssParseError: err.message }, 422);
      }

      throw err;
    }

    return {
      ...result.output,
      rss,
    };
  }),
  async (c) => {
    // @ts-expect-error Honoのバグ?
    const ENV = env<ENV>(c);
    const { KV } = c.env;
    const { unixTime, rss } = c.req.valid('param');

    rss.items = await replaceDescription(ENV, KV, rss.items, unixTime);

    return c.json(rss.items);
  },
);

export default app;
