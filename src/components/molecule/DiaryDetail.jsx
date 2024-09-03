import { Delete, Edit } from '@/assets/icons/menu';
import moodIcons from '@/assets/icons/mood/moodIcons';
import { useEffect, useState } from 'react';

// 임시 데이터 (DB 연결 시 삭제할 것)
const diaryData = [
  {
    id: 1,
    date: '2024-08-31',
    mood: 'happy',
    photoUrl:
      'https://i.namu.wiki/i/Y5AdKdPtkxn3BhOGJpmCtw9S7QzhVzxEXtOW956x4ViGTLM2K-BY-eZmcowW1Nsfhlc4sQyMoor8K2QlqcfVhV3in90TW_Pza6M0NC8IoPjzmpCLaLx-gr6Gi3U3PQSFBvGc3zcD-SXPATZgSO2-Cg.webp',
    content: `1일본 거장 애니메이터 미야자키 하야오가 감독한 스튜디오 지브리의
    2004년작 장편 애니메이션. 영국 소설가 다이애나 윈 존스의 동명 판타지
    소설을 원작으로 하였다. 스튜디오 지브리의 대표작 중 하나이며 지브리
    작품들 중에서는 센과 치히로의 행방불명 다음으로 상업적으로 가장 큰
    성공을 거두었다. 2000년대 이후 지브리 작품들 중에서도 센과 치히로의
    행방불명과 함께 가장 유명하고 잘 알려진 작품 중 하나로 역대 일본 흥행
    수입 9위, 글로벌 흥행 순위로는 3위에 랭크되`,
    weather: 'sunny',
  },
  {
    id: 2,
    date: '2024-09-21',
    mood: 'happy',
    photoUrl: '',
    content: `2일본 거장 애니메이터 미야자키 하야오가 감독한 스튜디오 지브리의
    2004년작 장편 애니메이션. 영국 소설가 다이애나 윈 존스의 동명 판타지
    소설을 원작으로 하였다. 스튜디오 지브리의 대표작 중 하나이며 지브리
    작품들 중에서는 센과 치히로의 행방불명 다음으로 상업적으로 가장 큰
    성공을 거두었다. 2000년대 이후 지브리 작품들 중에서도 센과 치히로의
    행방불명과 함께 가장 유명하고 잘 알려진 작품 중 하나로 역대 일본 흥행
    수입 9위, 글로벌 흥행 순위로는 3위에 랭크되`,
    weather: 'sunny',
  },
  {
    id: 3,
    date: '2024-08-11',
    mood: 'happy',
    photoUrl: '',
    content: `3일본 거장 애니메이터 미야자키 하야오가 감독한 스튜디오 지브리의
    2004년작 장편 애니메이션. 영국 소설가 다이애나 윈 존스의 동명 판타지
    소설을 원작으로 하였다. 스튜디오 지브리의 대표작 중 하나이며 지브리
    작품들 중에서는 센과 치히로의 행방불명 다음으로 상업적으로 가장 큰
    성공을 거두었다. 2000년대 이후 지브리 작품들 중에서도 센과 치히로의
    행방불명과 함께 가장 유명하고 잘 알려진 작품 중 하나로 역대 일본 흥행
    수입 9위, 글로벌 흥행 순위로는 3위에 랭크되`,
    weather: 'sunny',
  },
  {
    id: 4,
    date: '2024-07-12',
    mood: 'happy',
    photoUrl:
      'https://i.namu.wiki/i/Y5AdKdPtkxn3BhOGJpmCtw9S7QzhVzxEXtOW956x4ViGTLM2K-BY-eZmcowW1Nsfhlc4sQyMoor8K2QlqcfVhV3in90TW_Pza6M0NC8IoPjzmpCLaLx-gr6Gi3U3PQSFBvGc3zcD-SXPATZgSO2-Cg.webp',
    content: `4일본 거장 애니메이터 미야자키 하야오가 감독한 스튜디오 지브리의
    2004년작 장편 애니메이션. 영국 소설가 다이애나 윈 존스의 동명 판타지
    소설을 원작으로 하였다. 스튜디오 지브리의 대표작 중 하나이며 지브리
    작품들 중에서는 센과 치히로의 행방불명 다음으로 상업적으로 가장 큰
    성공을 거두었다. 2000년대 이후 지브리 작품들 중에서도 센과 치히로의
    행방불명과 함께 가장 유명하고 잘 알려진 작품 중 하나로 역대 일본 흥행
    수입 9위, 글로벌 흥행 순위로는 3위에 랭크되`,
    weather: 'sunny',
  },
];

const DiaryDetail = ({ selectedDate }) => {
  const [diaryEntry, setDiaryEntry] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const entry = diaryData.find((entry) => entry.date === selectedDate);
      setDiaryEntry(entry);
    }
  }, [selectedDate]);

  // 일기가 없다면 ? 일기가 없다는 안내 문구나 오류 페이지 필요할 것 같습니당!
  const errorPageHeader = `죄송합니다. \n현재 찾을 수 없는 페이지를 요청하셨습니다.`;
  const errorPagePhrase = `페이지의 주소가 잘못 입력되었거나, \n주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다`;

  if (!diaryEntry)
    return (
      <div className="flex flex-col items-center justify-center gap-5 ">
        <h2 className="text-lg font-bold text-center whitespace-pre-wrap text-blue">
          {errorPageHeader}
        </h2>
        <p className="text-sm font-medium text-center whitespace-pre-wrap">
          {errorPagePhrase}
        </p>
      </div>
    );

  const dateObj = new Date(diaryEntry.date);
  const day = dateObj.getDate();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekDays[dateObj.getDay()];
  const dateFormatted = `${day} ${weekday}`;

  return (
    <main className="w-full bg-white rounded-[10px] shadow-light px-[25px] py-5 mt-10 ">
      <div className="flex justify-end gap-[15px] item-center cursor-pointer">
        <Edit className="w-5 h-5 fill-gray-400" />
        <Delete className="w-5 h-5 fill-gray-400" />
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col items-center">
          <img
            key={diaryEntry.date}
            src={moodIcons[diaryEntry.mood]}
            alt="감정 아이콘"
            className="w-[44px] h-[44px]"
          />
          <span className="text-sm font-semibold text-gray-450">
            {dateFormatted}
          </span>
        </div>

        <div className="flex justify-between w-full ">
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              className="inline-block w-10 h-10 rounded-full bg-blue-50"
            ></span>
          ))}
        </div>

        {diaryEntry.photoUrl && (
          <img
            src={diaryEntry.photoUrl}
            className="w-full rounded-xl bg-blue-50"
            alt="일기 이미지"
          />
        )}

        <p className="text-sm font-medium tracking-wide text-blue-500">
          {diaryEntry.content}
        </p>
      </div>
    </main>
  );
};

export default DiaryDetail;
