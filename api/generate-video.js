export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  try {
    const { prompt, image } = req.body;

    if (!prompt || !image) {
      return res.status(400).json({ error: "프롬프트와 이미지가 필요합니다." });
    }

    // 아직 Runway 연결 전 테스트용
    return res.status(200).json({
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    });

  } catch (error) {
    return res.status(500).json({ error: "영상 생성 중 오류가 발생했습니다." });
  }
}
