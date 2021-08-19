import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { getMarkdownData } from '../../lib/getMarkdownData';
import ReactMarkdown from 'react-markdown';

export async function getStaticProps() {
	const jss = await getMarkdownData('jss.md');
	const edge = await getMarkdownData('edge.md');

	return {
		props: {
			jss,
			edge,
		},
	};
}

export default function HeadlessCMS({ jss, edge }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Headless CMS</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Headless CMS 💻</h1>
				<a href="/" className={styles.link}>
					<h2>Take me Home</h2>
				</a>
				<div className={styles.grid}>
					<div className={styles.socialsCard}>
						<ReactMarkdown>{jss.markdown}</ReactMarkdown>
					</div>

					<div className={styles.socialsCard}>
						<ReactMarkdown>{edge.markdown}</ReactMarkdown>
					</div>

					<div className={styles.socialsCard}>
						<h2>General Headless CMS Socials</h2>
						<li>
							<a href="https://sitecore.stackexchange.com/questions/tagged/headless">Headless StackExchange Tag</a>
						</li>
						<li>
							<a href="https://twitter.com/search?q=%23SitecoreHeadless&src=typed_query&f=live">#SitecoreHeadless Twitter</a>
						</li>
					</div>
					<div className={styles.socialsCard}>
						<h2>News & Announcements</h2>
						<a href="" className={styles.link}>
							<li>Cool new Headless CMS things</li>
						</a>
					</div>
					<div className={styles.socialsCard}>
						<h2>Get Help</h2>
						<a href="https://support.sitecore.com/kb?id=kb_home" className={styles.link}>
							<li>Sitecore Support</li>
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
