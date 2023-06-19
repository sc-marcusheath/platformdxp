// Global
// Components
import FeedHeading from 'ui/components/headings/FeedHeading';
// Local
import { SitecoreCommunityContent } from 'ui/common/types/sitecoreCommunity';
import SitecoreCommunityNewsOrEventItem from '../SitecoreCommunityNewsOrEventItem';

type SitecoreCommunityNewsProps = {
  title?: string;
  content?: SitecoreCommunityContent[];
  columns?: number;
};

const SitecoreCommunityNews = ({ title, content, columns }: SitecoreCommunityNewsProps): JSX.Element => {
  if (!content || content.length === 0) {
    return <></>;
  }

  return (
    <>
      <FeedHeading
        title={title ? title : 'News and Announcements'}
        link={{
          href: 'https://community.sitecore.com/community?id=community_forum&sys_id=af85dddf1bf17810486a4083b24bcb00',
          title: 'See all',
        }}
      />
      <ul className={`grid gap-8 ${columns ? `md:grid-cols-${columns}` : 'md:grid-cols-3'} `}>
        {content.map((item, i) => (
          <SitecoreCommunityNewsOrEventItem {...item} startDate={item.publishDate} categoryTitle="News and Announcements" key={i} />
        ))}
      </ul>
    </>
  );
};

export default SitecoreCommunityNews;
