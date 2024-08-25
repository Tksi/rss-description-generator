import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { validator } from 'hono/validator';
import { generateRss } from 'lib/generateRss';
import { replaceDescription } from 'lib/replaceDescription';
import Parser from 'rss-parser';
import * as v from 'valibot';
import { renderer } from './renderer';

const parser = new Parser();

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

    let rss: Awaited<ReturnType<(typeof parser)['parseURL']>>;

    try {
      // rss = await parser.parseURL(result.output.rssUrl);
      rss =
        await parser.parseString(`<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Hacker News: Front Page</title>
        <link>https://news.ycombinator.com/</link>
        <description>Hacker News RSS</description>
        <docs>https://hnrss.org/</docs>
        <generator>hnrss v2.1.1</generator>
        <lastBuildDate>Sun, 25 Aug 2024 03:49:29 +0000</lastBuildDate>
        <atom:link href="https://hnrss.org/frontpage" rel="self" type="application/rss+xml"></atom:link>
        <item>
            <title><![CDATA[Transfer energy from nitrogen to argon enables 2-wayl cascaded lasing in air]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://phys.org/news/2024-08-mechanism-energy-nitrogen-argon-enables.html">https://phys.org/news/2024-08-mechanism-energy-nitrogen-argon-enables.html</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41343924">https://news.ycombinator.com/item?id=41343924</a></p>
<p>Points: 4</p>
<p># Comments: 1</p>
]]></description>
            <pubDate>Sun, 25 Aug 2024 02:46:52 +0000</pubDate>
            <link>https://phys.org/news/2024-08-mechanism-energy-nitrogen-argon-enables.html</link>
            <dc:creator>wglb</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41343924</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41343924</guid>
        </item>
        <item>
            <title><![CDATA[Serpent OS Prealpha0 Released]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/">https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41343444">https://news.ycombinator.com/item?id=41343444</a></p>
<p>Points: 13</p>
<p># Comments: 7</p>
]]></description>
            <pubDate>Sun, 25 Aug 2024 01:10:13 +0000</pubDate>
            <link>https://serpentos.com/blog/2024/08/01/serpent-os-prealpha0-released/</link>
            <dc:creator>ekTHEN</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41343444</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41343444</guid>
        </item>
        <item>
            <title><![CDATA[Looming Liability Machines (LLMs)]]></title>
            <description><![CDATA[
<p>Article URL: <a href="http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html">http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41343024">https://news.ycombinator.com/item?id=41343024</a></p>
<p>Points: 35</p>
<p># Comments: 26</p>
]]></description>
            <pubDate>Sun, 25 Aug 2024 00:05:44 +0000</pubDate>
            <link>http://muratbuffalo.blogspot.com/2024/08/looming-liability-machines.html</link>
            <dc:creator>zdw</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41343024</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41343024</guid>
        </item>
        <item>
            <title><![CDATA[Defenders think in lists, attackers think in graphs (2015)]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md">https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41342637">https://news.ycombinator.com/item?id=41342637</a></p>
<p>Points: 109</p>
<p># Comments: 36</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 23:12:18 +0000</pubDate>
            <link>https://github.com/JohnLaTwC/Shared/blob/master/Defenders%20think%20in%20lists.%20Attackers%20think%20in%20graphs.%20As%20long%20as%20this%20is%20true%2C%20attackers%20win.md</link>
            <dc:creator>akyuu</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41342637</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41342637</guid>
        </item>
        <item>
            <title><![CDATA[Ask HN: What are you working on (August 2024)?]]></title>
            <description><![CDATA[
<p>What are you working on? Any new ideas that you're thinking about?</p>
<hr>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41342017">https://news.ycombinator.com/item?id=41342017</a></p>
<p>Points: 198</p>
<p># Comments: 439</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 22:00:34 +0000</pubDate>
            <link>https://news.ycombinator.com/item?id=41342017</link>
            <dc:creator>david927</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41342017</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41342017</guid>
        </item>
        <item>
            <title><![CDATA[Birds aren't real – how to create your own "bird"]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird">https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341817">https://news.ycombinator.com/item?id=41341817</a></p>
<p>Points: 29</p>
<p># Comments: 15</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 21:41:21 +0000</pubDate>
            <link>https://www.lampysecurity.com/post/birds-aren-t-real-how-to-create-your-own-bird</link>
            <dc:creator>lampysecurity</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41341817</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41341817</guid>
        </item>
        <item>
            <title><![CDATA[Papersway – a scrollable window management for Sway/i3wm]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://spwhitton.name/tech/code/papersway/">https://spwhitton.name/tech/code/papersway/</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341797">https://news.ycombinator.com/item?id=41341797</a></p>
<p>Points: 88</p>
<p># Comments: 20</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 21:39:39 +0000</pubDate>
            <link>https://spwhitton.name/tech/code/papersway/</link>
            <dc:creator>smartmic</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41341797</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41341797</guid>
        </item>
        <item>
            <title><![CDATA[AMD's Radeon 890M: Strix Point's Bigger iGPU]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/">https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341786">https://news.ycombinator.com/item?id=41341786</a></p>
<p>Points: 60</p>
<p># Comments: 3</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 21:39:07 +0000</pubDate>
            <link>https://chipsandcheese.com/2024/08/24/amds-radeon-890m-strix-points-bigger-igpu/</link>
            <dc:creator>luyu_wu</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41341786</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41341786</guid>
        </item>
        <item>
            <title><![CDATA[Telegram founder Pavel Durov arrested at French airport]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport">https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41341353">https://news.ycombinator.com/item?id=41341353</a></p>
<p>Points: 675</p>
<p># Comments: 549</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 20:46:00 +0000</pubDate>
            <link>https://www.theguardian.com/media/article/2024/aug/24/telegram-app-founder-pavel-durov-arrested-at-french-airport</link>
            <dc:creator>NoxiousPluK</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41341353</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41341353</guid>
        </item>
        <item>
            <title><![CDATA[The Vital Necessity of Very Old Books (2023)]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://www.millersbookreview.com/p/vital-necessity-of-very-old-books">https://www.millersbookreview.com/p/vital-necessity-of-very-old-books</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41340948">https://news.ycombinator.com/item?id=41340948</a></p>
<p>Points: 36</p>
<p># Comments: 10</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 19:49:25 +0000</pubDate>
            <link>https://www.millersbookreview.com/p/vital-necessity-of-very-old-books</link>
            <dc:creator>Bluestein</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41340948</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41340948</guid>
        </item>
        <item>
            <title><![CDATA[Show HN: High school robotics code/CAD/design binder release]]></title>
            <description><![CDATA[
<p>Hello HN!<p>My name is Patrick, and I am a junior at my High School’s FRC robotics team FRC 341 “Miss Daisy” (yes named after the movie). Every year, during the first weekend in January, a new robotics game is released (no it’s not battlebots). The game could be about launching balls into a goal, climbing monkeybars, or placing cubes on a see-saw. This year we were challenged to build a robot that could shoot orange foam donuts into a goal about 6 feet in the air. Here is a yt video with the game animation <a href="https://www.youtube.com/watch?v=9keeDyFxzY4&t" rel="nofollow">https://www.youtube.com/watch?v=9keeDyFxzY4&t</a>. After we received the game we then had six weeks to design, build, program, and field a robot capable of playing the game. And we did pretty well this year! I have attached a ChiefDelphi thread (robotics forum) where we have released our season materials. This being our CAD (3D model of robot), code, and design binder. I encourage you to take a look and leave any questions that you may have.<p>Thanks a lot!</p>
<hr>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41340874">https://news.ycombinator.com/item?id=41340874</a></p>
<p>Points: 42</p>
<p># Comments: 13</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 19:40:18 +0000</pubDate>
            <link>https://www.chiefdelphi.com/t/team-341-miss-daisy-2024-cad-code-and-design-binder-release/467546</link>
            <dc:creator>Hacktrick</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41340874</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41340874</guid>
        </item>
        <item>
            <title><![CDATA[Golang Interpreter Written in PHP]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://github.com/tuqqu/go-php">https://github.com/tuqqu/go-php</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339818">https://news.ycombinator.com/item?id=41339818</a></p>
<p>Points: 94</p>
<p># Comments: 34</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 17:34:13 +0000</pubDate>
            <link>https://github.com/tuqqu/go-php</link>
            <dc:creator>hu3</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41339818</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41339818</guid>
        </item>
        <item>
            <title><![CDATA[NASA announces Boeing Starliner crew will return on SpaceX Crew-9]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://twitter.com/NASA/status/1827393397939634503">https://twitter.com/NASA/status/1827393397939634503</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339667">https://news.ycombinator.com/item?id=41339667</a></p>
<p>Points: 378</p>
<p># Comments: 525</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 17:14:09 +0000</pubDate>
            <link>https://twitter.com/NASA/status/1827393397939634503</link>
            <dc:creator>ripjaygn</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41339667</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41339667</guid>
        </item>
        <item>
            <title><![CDATA[OneText (YC W23) Is Hiring a Chief of Staff]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff">https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339577">https://news.ycombinator.com/item?id=41339577</a></p>
<p>Points: 0</p>
<p># Comments: 0</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 17:00:05 +0000</pubDate>
            <link>https://www.ycombinator.com/companies/onetext/jobs/B1RIFNb-founding-chief-of-staff</link>
            <dc:creator>jfudem</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41339577</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41339577</guid>
        </item>
        <item>
            <title><![CDATA[JavaScript dates are about to be fixed]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://docs.timetime.in/blog/js-dates-finally-fixed">https://docs.timetime.in/blog/js-dates-finally-fixed</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339493">https://news.ycombinator.com/item?id=41339493</a></p>
<p>Points: 311</p>
<p># Comments: 231</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 16:47:12 +0000</pubDate>
            <link>https://docs.timetime.in/blog/js-dates-finally-fixed</link>
            <dc:creator>thunderbong</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41339493</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41339493</guid>
        </item>
        <item>
            <title><![CDATA[Show HN: Visualize database schemas with a single query]]></title>
            <description><![CDATA[
<p>Hey HN! We are Jonathan & Guy, and we are happy to share a project we’ve been working on. ChartDB is a tool to help developers and data analysts quickly visualize database schemas by generating ER diagrams with just one query. 
A unique feature of our product is AI-Powered export for easy migration. 
You can give it a try at <a href="https://chartdb.io" rel="nofollow">https://chartdb.io</a> and find the source code on GitHub.
Next steps ---> More AI. 
We’d love feedback :)</p>
<hr>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339308">https://news.ycombinator.com/item?id=41339308</a></p>
<p>Points: 138</p>
<p># Comments: 38</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 16:23:46 +0000</pubDate>
            <link>https://github.com/chartdb/chartdb</link>
            <dc:creator>Jonathanfishner</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41339308</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41339308</guid>
        </item>
        <item>
            <title><![CDATA[Foundation for Human Vision Models]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://github.com/facebookresearch/sapiens">https://github.com/facebookresearch/sapiens</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41339163">https://news.ycombinator.com/item?id=41339163</a></p>
<p>Points: 58</p>
<p># Comments: 10</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 16:04:28 +0000</pubDate>
            <link>https://github.com/facebookresearch/sapiens</link>
            <dc:creator>yoknapathawa</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41339163</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41339163</guid>
        </item>
        <item>
            <title><![CDATA[Pipe Syntax in SQL]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/">https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338877">https://news.ycombinator.com/item?id=41338877</a></p>
<p>Points: 241</p>
<p># Comments: 167</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 15:15:04 +0000</pubDate>
            <link>https://research.google/pubs/sql-has-problems-we-can-fix-them-pipe-syntax-in-sql/</link>
            <dc:creator>legrangramgroum</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41338877</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41338877</guid>
        </item>
        <item>
            <title><![CDATA[Small Strings in Rust: smolstr vs. smartstring]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://fasterthanli.me/articles/small-strings-in-rust">https://fasterthanli.me/articles/small-strings-in-rust</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338776">https://news.ycombinator.com/item?id=41338776</a></p>
<p>Points: 145</p>
<p># Comments: 54</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 14:58:33 +0000</pubDate>
            <link>https://fasterthanli.me/articles/small-strings-in-rust</link>
            <dc:creator>airstrike</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41338776</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41338776</guid>
        </item>
        <item>
            <title><![CDATA[Implementing React from Scratch]]></title>
            <description><![CDATA[
<p>Article URL: <a href="https://www.rob.directory/blog/react-from-scratch">https://www.rob.directory/blog/react-from-scratch</a></p>
<p>Comments URL: <a href="https://news.ycombinator.com/item?id=41338729">https://news.ycombinator.com/item?id=41338729</a></p>
<p>Points: 107</p>
<p># Comments: 7</p>
]]></description>
            <pubDate>Sat, 24 Aug 2024 14:50:31 +0000</pubDate>
            <link>https://www.rob.directory/blog/react-from-scratch</link>
            <dc:creator>robpruzan</dc:creator>
            <comments>https://news.ycombinator.com/item?id=41338729</comments>
            <guid isPermaLink="false">https://news.ycombinator.com/item?id=41338729</guid>
        </item>
    </channel>
</rss>
`);
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
