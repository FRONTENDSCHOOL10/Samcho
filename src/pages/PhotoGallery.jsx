import { TopHeader } from '@/components';
import { Helmet } from 'react-helmet-async';

const dummyDB = [
  {
    id: 1,
    date: '2024-07-31',
    mood: 'happy',
    picture:
      'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/dqCU/image/2yjMHNudp61nTAq6CzH1aSAMUeE.jpg',
    content: `1`,
    weather: 'sunny',
  },
  {
    id: 2,
    date: '2024-08-01',
    mood: 'happy',
    picture: '',
    content: `2`,
    weather: 'sunny',
  },
  {
    id: 3,
    date: '2024-08-11',
    mood: 'happy',
    picture: '',
    content: `3일`,
    weather: 'sunny',
  },
  {
    id: 4,
    date: '2024-08-12',
    mood: 'happy',
    picture:
      'https://cdn.eyesmag.com/content/uploads/posts/2020/01/03/studio-ghibli-hayao-miyazaki-two-new-movies-2020-1-b1a90537-20c5-4aac-874d-471cc550499e.jpg',
    content: `4`,
    weather: 'sunny',
  },
  {
    id: 5,
    date: '2024-09-01',
    mood: 'happy',
    picture:
      'https://i.pinimg.com/736x/2f/d2/42/2fd2427a4efd37c9a5bc371c13f759e6.jpg',
    content: `5`,
    weather: 'sunny',
  },
  {
    id: 6,
    date: '2024-09-02',
    mood: 'happy',
    picture: '',
    content: `6`,
    weather: 'sunny',
  },
  {
    id: 7,
    date: '2024-09-03',
    mood: 'happy',
    picture:
      'https://i.namu.wiki/i/Y5AdKdPtkxn3BhOGJpmCtw9S7QzhVzxEXtOW956x4ViGTLM2K-BY-eZmcowW1Nsfhlc4sQyMoor8K2QlqcfVhV3in90TW_Pza6M0NC8IoPjzmpCLaLx-gr6Gi3U3PQSFBvGc3zcD-SXPATZgSO2-Cg.webp',
    content: `7`,
    weather: 'sunny',
  },
  {
    id: 8,
    date: '2024-09-05',
    mood: 'happy',
    picture:
      'https://i.namu.wiki/i/Y5AdKdPtkxn3BhOGJpmCtw9S7QzhVzxEXtOW956x4ViGTLM2K-BY-eZmcowW1Nsfhlc4sQyMoor8K2QlqcfVhV3in90TW_Pza6M0NC8IoPjzmpCLaLx-gr6Gi3U3PQSFBvGc3zcD-SXPATZgSO2-Cg.webp',
    content: `8`,
    weather: 'sunny',
  },
  {
    id: 9,
    date: '2024-09-08',
    mood: 'happy',
    picture:
      'https://i.namu.wiki/i/Y5AdKdPtkxn3BhOGJpmCtw9S7QzhVzxEXtOW956x4ViGTLM2K-BY-eZmcowW1Nsfhlc4sQyMoor8K2QlqcfVhV3in90TW_Pza6M0NC8IoPjzmpCLaLx-gr6Gi3U3PQSFBvGc3zcD-SXPATZgSO2-Cg.webp',
    content: `9`,
    weather: 'sunny',
  },
];

const PhotoGallery = () => {
  // 1. diary DB에서 사진이 있는 DB만 골라오기
  const PictureWithDiary = dummyDB.filter((data) => data.picture !== '');

  // 2. 그 DB들을 같은 년/월 끼리 그룹핑
  const groupByMonth = PictureWithDiary.reduce((group, diary) => {
    let [year, month] = diary.date.split('-');
    month = parseInt(month, 10);
    const DateKey = `${year}년 ${month}월`;

    if (!group[DateKey]) group[DateKey] = [];

    group[DateKey].push(diary);
    return group;
  }, {});

  return (
    <>
      <Helmet>
        <title>하루몽 - 사진 모아보기</title>
        <meta name="description" content="하루몽 사진 모아보기 페이지입니다." />
        <meta property="og:title" content="하루몽 - 사진 모아보기" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/mypage/photo"
        />
        <meta
          property="og:description"
          content="감정일기의 사진을 모아보는 페이지입니다."
        />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="하루몽 일동" />
      </Helmet>

      <main className="grid gap-5">
        <TopHeader isShowIcon={true} title="사진 모아보기" />

        {Object.entries(groupByMonth).map(([date, diaries]) => (
          <section key={date} className="grid gap-2 mb-4">
            <h2 className="font-semibold">{date}</h2>
            <div className="grid grid-cols-3 gap-4">
              {diaries.map((diary) => (
                <div key={diary.id} style={{ aspectRatio: '1 / 1' }}>
                  <img
                    src={`${diary.picture}`}
                    alt={`${diary.date}의 일기 사진`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default PhotoGallery;
